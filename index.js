const version = "v1.0.0"
document.title = `FP275 Stat Checker ${version}`
document.getElementById("version").innerHTML = version
async function LookupUser(username) {
    const robloxData = await fetch(`https://api.trafficmanagerfp275.dev/roblox-redirect/users/lookup/byUsername?username=${username}`, {
        method: 'GET',
        
    }).then((res) => res.json()).catch(() => [])
    if (robloxData.length < 1) return false
    const userId = robloxData['id']
    const lookupResponse = (await fetch(`https://api.trafficmanagerfp275.dev/stats/lookup?userId=${userId}`, {
        method: 'GET'
    }).then((res) => res.json()))
    console.log(lookupResponse)
    return lookupResponse
}
async function DoLookup() {
    const username = document.getElementById('lookup-username-input').value
    document.getElementById('lookup:username').innerHTML = 'Username: ' + username
    document.getElementById('lookup:asteroid-count').innerHTML = 'Asteroids: Loading...'
    const response = await LookupUser(username)
    if (response == false) {
        document.getElementById('username-input-error').innerHTML = 'Error: Invalid username!'
        document.getElementById('lookup:asteroid-count').innerHTML = 'Asteroids: Error!'
        setTimeout(() => {
            document.getElementById('username-input-error').innerHTML = ''
            document.getElementById('lookup:username').innerHTML = 'Username: ???'
            document.getElementById('lookup:asteroid-count').innerHTML = 'Asteroids: ???'
        }, 3000)
        return
    }
    const stats = response.stats
    const asteroids = stats.asteroids
    document.getElementById('lookup:asteroid-count').innerHTML = 'Asteroids: ' + asteroids.toString()
}

async function FetchLeaderboard() {
    const f = await fetch(`https://api.trafficmanagerfp275.dev/stats/asteroids/leaderboard`, {
        method: 'GET'
    }).then((res) => res.json())
    f.sort((a, b) => a.place - b.place)
    console.log(f)
    return f
}
async function ShowLeaderboard() {
    document.getElementById('refresh-leaderboard').disabled = true
    const leaderboardData = await FetchLeaderboard(true)
    .catch(() => {
        document.getElementById('refresh-leaderboard').innerHTML = 'Too many requests, try again in around a minute.'
        setTimeout(() => {
            document.getElementById('refresh-leaderboard').disabled = false
            document.getElementById('refresh-leaderboard').innerHTML = 'Refresh Leaderboard'
        }, 10_000)
    })
    const Table = document.getElementById('aaaaaaaaaaaaaaaaaaaaaa')
    for (let index = 0; index < Table.childNodes.length; index++) {
        const element = Table.children.item(index)
        element.remove()
    }
    const HeaderRow = document.createElement('tr')
    const RankHeader = document.createElement('th')
    RankHeader.innerHTML = 'Rank'
    const NameHeader = document.createElement('th')
    NameHeader.innerHTML = 'Username'
    const AsteroidsHeader = document.createElement('th')
    AsteroidsHeader.innerHTML = 'Asteroids'

    HeaderRow.appendChild(RankHeader)
    HeaderRow.appendChild(NameHeader)
    HeaderRow.appendChild(AsteroidsHeader)
    Table.appendChild(HeaderRow)

    leaderboardData.forEach(element => {
        const Row = document.createElement('tr')
        const Rank = document.createElement('td')
        const Name = document.createElement('td')
        const Asteroids = document.createElement('td')
        Rank.innerHTML = element.place
        if (element.name != element.displayName) {
            Name.innerHTML = `${element.displayName} (@${element.username})`
        } else {
            Name.innerHTML = element.name
        }
        Asteroids.innerHTML = element.asteroids
        Row.appendChild(Rank)
        Row.appendChild(Name)
        Row.appendChild(Asteroids)
        Table.appendChild(Row)
    });
    document.getElementsByClassName('lookup')[0].style.top = `${-(document.getElementById('cringe').clientHeight) + 1}px`
    document.getElementById('refresh-leaderboard').disabled = false
}
