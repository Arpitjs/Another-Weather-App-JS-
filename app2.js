const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast()
console.log(forecast)
function updateUI({ cityDets, weather }) {

  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc)

  timeSrc = null
  weather.IsDayTime ? timeSrc = 'img/day.svg' : timeSrc = 'img/night.svg'
  time.setAttribute('src', timeSrc)

  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  forecast.getInfo(city)
    .then(data => {
      updateUI(data)
      console.log(data)
    })
    .catch(err => console.log(err));

  localStorage.setItem('city', city)
});

if (localStorage.getItem('city')) {
  forecast.getInfo(localStorage.getItem('city'))
    .then(data => updateUI(data))
}