const axios = require('axios').default
axios.get('http://moonsteal.eastus.cloudapp.azure.com:8080/events').then((res) => {
    console.log(res.data)
})