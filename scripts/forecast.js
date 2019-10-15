let apiKey = '06tSf4xWyRtEVh8bxRujiekmEd2UvkVz'

const getCity = async function (city) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
    const response = await fetch(url)
    const data = await response.json()
    //response.json returns a promise
    return data[0]
}

getWeather = async function (locationKey) {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()
    return data[0]
}

// getCity('Kathmandu')
//     .then(data => {
//         return getWeather(data.Key)
//     })
//     .then(response => console.log(response))
//     .catch(err => console.log(err))
