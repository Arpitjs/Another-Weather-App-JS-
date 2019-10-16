const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

async function getInfo(city) {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather };
};

function updateUI({ cityDets, weather }) {

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc)

  timeSrc = null
  weather.IsDayTime ? timeSrc = 'img/day.svg' : timeSrc = 'img/night.svg'
  time.setAttribute('src', timeSrc)

  // remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  getInfo(city)
    .then(data => {
      updateUI(data)
      console.log(data)
    })
    .catch(err => console.log(err));

  //set local storage
  localStorage.setItem('city', city)
});

if (localStorage.getItem('city')) {
  getInfo(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log)
}