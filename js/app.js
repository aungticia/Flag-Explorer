let countries = [];
const modalContent = document.querySelector('.modal-content');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.modal-close');
const container = document.querySelector('.countries');

//========================
//  Your Code Goes Here
//------------------------

container.addEventListener('click', (event) => {
  const countryCard = event.target.closest('.country');
  if (!countryCard) return;

  const countryName = countryCard.dataset.name;
  const country = countries.find(
    (country) => country.name.common === countryName
  );
  displayCountryModal(country);
});


function displayCountryModal(country) {
  const modalHTML = `
    <h2>${country.name.common}</h2>
    <div class ='flag'>
      <img src =${country.flags.svg} alt=${country.flags.alt} />
    </div>
    <div class='content'>
        <h3>Population:</h3>
        <p>${country.population}</p>
        <h3>Region:</h3>
        <p>${country.region}</p>
        <h3>Capital:</h3>
        <p>${country.capital}</p> 
    </div>
  `;
  modalContent.innerHTML = modalHTML;
  overlay.classList.add('open');
}
closeButton.addEventListener('click', () => {
  overlay.classList.remove('open');                           
});


//========================
//  EXTRA CREDIT
//------------------------

// Close the modal when the user clicks outside of the modal
overlay.addEventListener('click', (event) => {
  const isOutside = !event.target.closest('.modal');
  if (isOutside) {
    overlay.classList.remove('open');
  }
});

// Close the modal when the user presses the escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    overlay.classList.remove('open');
  }
});


//========================
//  FETCH DATA
//------------------------
async function getCountries() {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region'
  );
  const data = await response.json();
  countries = data;
  displayCountries(data);
  return data;
}

function displayCountries(countries) {
  const countriesHTML = countries
    .map(
      (country) => `
          <div class="country" data-name="${country.name.common}">
              <h3 class="country-name">${country.name.common}</h3>
              <img class="country-flag" src="${country.flags.svg}" />
          </div>
      `
    )
    .join('');
  container.innerHTML = countriesHTML;
}

getCountries();
