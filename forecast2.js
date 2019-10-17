class Forecast{
    constructor(){
        this.apiKey = 'eP9Ow5wvFPjMPmWOvl1joQp7w5kuYcjG' 
        this.cityURL = `http://dataservice.accuweather.com/locations/v1/cities/search`
        this.weatherURL = `http://dataservice.accuweather.com/currentconditions/v1/`
    }
    async getCity (city) {
        const query = `?apikey=${this.apiKey}&q=${city}`
        const response = await fetch(this.cityURL + query)
        const data = await response.json()
        return data[0]
    }
    async getWeather (locationKey) {
        const params = `${locationKey}?apikey=${this.apiKey}`
        const response = await fetch(this.weatherURL + params)
        const data = await response.json()
        return data[0]
    }
    async getInfo(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return { cityDets, weather };
      }
}

//getInfo function takes the city that we pass as argument
// then gets the city
// then passes the city code of that city to the getWeather function to get the weather
// then return both city and weather