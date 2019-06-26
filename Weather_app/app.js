// ================================================================
// First version: (geolocation request on page loading)
// window.addEventListener('load', () => {
//     if (navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(position => {
//             console.log(position);
//         });
//     } else {
//         h1.textContent = 'Location access disabled';
//     }
// });
// ================================================================
// UPDATE: Avoid Requesting The Geolocation Permission On Page Load
// ================================================================
// Geolocation must be obtained only after user input!
// ================================================================
document.querySelector('.location-info').onclick = function() {

    let location = document.querySelector('.location-info');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureInfo = document.querySelector('.temperature-info');
    let iconImg = document.getElementById('icon');
    let degreeSection = document.querySelector('.degree-section');
    let degreeSpan = document.querySelector('.degree-section span');

    let errorMsg = function() {
        location.textContent = "Cannot access your location. Try again";
    };

    let locationTimeout = setTimeout(errorMsg, 5000);

    let geoSuccess = function(position) {

        clearTimeout(locationTimeout);

        //get location
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        //use API
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=73bf5bf05582021c8440ed1de3a12b08`;

        fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const {temp} = data.main;
                const {country} = data.sys;
                const city = data.name;
                const {description, icon} = data.weather[0];
                //temperature units
                let fahrenheit = Math.floor(temp * 1.8 + 32);
                let celsius = Math.round(temp * 10) / 10;
                //update DOM with API
                location.textContent = `${country}, ${city}`;
                temperatureDegree.textContent = celsius;
                temperatureInfo.textContent = description;
                //change icon
                iconImg.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="icon" />`;

                //change degrees Celcius/Fahrenheit
                degreeSection.addEventListener('click', () => {
                    if (degreeSpan.textContent === 'C') {
                        temperatureDegree.textContent = fahrenheit;
                        degreeSpan.textContent = 'F';
                    } else {
                        temperatureDegree.textContent = celsius;
                        degreeSpan.textContent = 'C';
                    }
                })
            });
    };
    let geoError = function(error) {
      switch(error.code) {
        case error.TIMEOUT:
          // The user didn't accept the callout
          errorMsg();
          break;
      }
    };


    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  };