const currencyOneContainer = document.querySelector('[data-js="currency-one"]')
const currencyTwoContainer = document.querySelector('[data-js="currency-two"]')
const currencyOneOptionsContainer = document.querySelector('[data-js="currency-one-options-container"]')
const currencyTwoOptionsContainer = document.querySelector('[data-js="currency-two-options-container"]')

const generateOptions = async () => {
    const { conversion_rates } = await getExchangeRate()
    const countries = await getCountries()

    const options = Object.keys(conversion_rates).map(currency => {
        const flagCode = currency.slice(0, 2).toLowerCase()
        const { code, countryName } = countries.find(country => country.code === currency)

        return `<li class="currency__content-item">
            <div class="currency__content-image">
                <img 
                    src="https://flagcdn.com/w80/${flagCode}.png" 
                    srcset="https://flagcdn.com/w160/${flagCode}.png 2x"
                    width="50"
                />
            </div>

            <div class="currency-name">
                <h2>${currency}</h2>
                <span>${countryName}</span>
            </div>

            <div class="arrow-right">
                <i class="ri-arrow-right-s-line"></i>
            </div>
        </li>`
    })

    const formattedOptions = options.join().replaceAll(',', '')

    currencyOneOptionsContainer.innerHTML = formattedOptions
}

generateOptions()

const closeCurrencyContainer = () => {
    currencyOneOptionsContainer.classList.remove('show-options')
    currencyTwoOptionsContainer.classList.remove('show-options')
}

const handleCurrencyContainerVisibility = event => {
    event.stopPropagation()

    const clickedCurrencyContainer = event.currentTarget.dataset.js
    const isClickedCurrencyOne = clickedCurrencyContainer === 'currency-one'
    
    if (isClickedCurrencyOne) {
        currencyOneOptionsContainer.classList.toggle('show-options')
        currencyTwoOptionsContainer.classList.remove('show-options')
        return
    }

    currencyTwoOptionsContainer.classList.toggle('show-options')
    currencyOneOptionsContainer.classList.remove('show-options')
}

currencyOneOptionsContainer.addEventListener('click', event => {
    event.stopPropagation()

    const selectedCurrency = event.target.closest('.currency__content-item')
    
    if (selectedCurrency) {
        currencyOneOptionsContainer.classList.remove('show-options')
    }
})

currencyTwoOptionsContainer.addEventListener('click', event => {
    event.stopPropagation()

    const selectedCurrency = event.target.closest('.currency__content-item')
    
    if (selectedCurrency) {
        currencyTwoOptionsContainer.classList.remove('show-options')
    }
})

document.addEventListener('click', closeCurrencyContainer)
currencyOneContainer.addEventListener('click', handleCurrencyContainerVisibility)
currencyTwoContainer.addEventListener('click', handleCurrencyContainerVisibility)
