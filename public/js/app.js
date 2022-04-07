const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const fetchWeather = (address) => {
  fetch(`/weather?address=${address}`).then((response) => {
    console.log('response: ', response);
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = `${data.feelsLike} ${data.temperature}`;
      }
    });
  });
};

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetchWeather(search.value);
});
