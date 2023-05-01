async function FetchLeaderboard() {
    const f = await fetch('http://moonsteal.eastus.cloudapp.azure.com:8080/stats/asteroids/leaderboard', {
        method: 'GET'
    }).then((res) => res.json())
    return f
}
async function LookupUser(username) {
    const robloxData = await fetch(`http://moonsteal.eastus.cloudapp.azure.com:8080/roblox-redirect/users/lookup/byUsername?username=${username}`, {
        method: 'GET',
    }).then((res) => res.json())
    if (robloxData.length < 1) return false
    const userId = robloxData['id']
    const lookupResponse = (await fetch(`http://moonsteal.eastus.cloudapp.azure.com:8080/stats/lookup?userId=${userId}`, {
        method: 'GET'
    }).then((res) => res.json()))
    console.log(lookupResponse)
    return lookupResponse
}