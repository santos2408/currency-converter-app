const currencyOneContainer = document.querySelector('[data-js="currency-one"]')
const currencyTwoContainer = document.querySelector('[data-js="currency-two"]')
const currencyOneOptionsContainer = document.querySelector('[data-js="currency-one-options-container"]')
const currencyTwoOptionsContainer = document.querySelector('[data-js="currency-two-options-container"]')
const exchangeRateButton = document.querySelector('[data-js="exchange-button"]')

const generateOptions = async () => {
    const { conversion_rates } = state.getExchangeRate()
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

            <div class="currency-name" data-js="currency-name">
                <h2>${currency}</h2>
                <span>${countryName}</span>
            </div>

            <div class="arrow-right" data-js="currency-icon">
                <i class="ri-arrow-right-s-line"></i>
            </div>
        </li>`
    })

    const formattedOptions = options.join().replaceAll(',', '')

    currencyOneOptionsContainer.innerHTML = formattedOptions
    currencyTwoOptionsContainer.innerHTML = formattedOptions
}

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

const showCurrentConverter = () => {
    const currencyResult = document.querySelector('[data-js="currency-result"] h1')
    const currencyResultDetailed = document.querySelector('[data-js="currency-result"] p')
    const currencyAmount = document.querySelector('[data-js="currency-amount"]')
    const currencyTwoName = currencyTwoContainer.querySelector('[data-js="currency-name"] h2')

    const { base_code, conversion_rates } = state.getExchangeRate()
    const currencyValueToBeConverted = conversion_rates[currencyTwoName.textContent]
    const convertedValue = Number(currencyAmount.value * currencyValueToBeConverted)

    currencyResult.textContent = `${convertedValue.toFixed(2)}`
    currencyResultDetailed.textContent = `1,000 ${base_code} = ${convertedValue.toFixed(2)} ${currencyTwoName.textContent}`
}

const changeSelectedBaseCurrency = async selectedCurrency => {
    const currencyImage = currencyOneContainer.querySelector('[data-js="currency-content-image"] img')
    const currencyName = currencyOneContainer.querySelector('[data-js="currency-name"] h2')
    const currencyCountry = currencyOneContainer.querySelector('[data-js="currency-name"] span')

    const { base_code } = await fetchExchangeRate(selectedCurrency)
    const countries = await getCountries()

    const { _, countryName } = countries.find(country => country.code === base_code)
    const flagCode = base_code.slice(0, 2).toLowerCase()

    currencyImage.setAttribute('src', `https://flagcdn.com/w80/${flagCode}.png`)
    currencyImage.setAttribute('srcset', `https://flagcdn.com/w160/${flagCode}.png 2x`)
    currencyImage.setAttribute('width', '50')

    currencyName.textContent = `${base_code}`
    currencyCountry.textContent = `${countryName}`
}

const changeSelectedSecondCurrency = async selectedCurrency => {
    const currencyImage = currencyTwoContainer.querySelector('[data-js="currency-content-image"] img')
    const currencyName = currencyTwoContainer.querySelector('[data-js="currency-name"] h2')
    const currencyCountry = currencyTwoContainer.querySelector('[data-js="currency-name"] span')

    const { conversion_rates } = state.getExchangeRate()
    const countries = await getCountries()

    const { code, countryName } = countries.find(country => country.code === selectedCurrency)
    const flagCode = code.slice(0, 2).toLowerCase()
    
    currencyImage.setAttribute('src', `https://flagcdn.com/w80/${flagCode}.png`)
    currencyImage.setAttribute('srcset', `https://flagcdn.com/w160/${flagCode}.png 2x`)
    currencyImage.setAttribute('width', '50')

    currencyName.textContent = `${code}`
    currencyCountry.textContent = `${countryName}`
}

const handleCurrencyOneOptions = event => {
    event.stopPropagation()

    const selectedCurrencyItem = event.target.closest('.currency__content-item')

    if (!selectedCurrencyItem) {
        return
    }

    const selectedCurrencyElement = selectedCurrencyItem.querySelector('[data-js="currency-name"] h2')
    const selectedCurrency = selectedCurrencyElement.textContent

    currencyOneOptionsContainer.classList.remove('show-options')
    changeSelectedBaseCurrency(selectedCurrency)
}

const handleCurrencyTwoOptions = event => {
    event.stopPropagation()

    const selectedCurrencyItem = event.target.closest('.currency__content-item')

    if (!selectedCurrencyItem) {
        return
    }

    const selectedCurrencyElement = selectedCurrencyItem.querySelector('[data-js="currency-name"] h2')
    const selectedCurrency = selectedCurrencyElement.textContent

    currencyTwoOptionsContainer.classList.remove('show-options')
    changeSelectedSecondCurrency(selectedCurrency)
}

const initCurrencies = async selectedCurrency => {
    const currencyImages = document.querySelectorAll('[data-js="currency-content-image"] img')
    const currencyNames = document.querySelectorAll('[data-js="currency-name"] h2')
    const currencyCountries = document.querySelectorAll('[data-js="currency-name"] span')

    const { base_code } = await fetchExchangeRate(selectedCurrency)
    const countries = await getCountries()

    const { _, countryName } = countries.find(country => country.code === base_code)
    const flagCode = base_code.slice(0, 2).toLowerCase()

    currencyImages.forEach(currencyImage => {
        currencyImage.setAttribute('src', `https://flagcdn.com/w80/${flagCode}.png`)
        currencyImage.setAttribute('srcset', `https://flagcdn.com/w160/${flagCode}.png 2x`)
        currencyImage.setAttribute('width', '50')
    })

    currencyNames.forEach(currencyName => currencyName.textContent = `${base_code}`)
    currencyCountries.forEach(currencyCountry => currencyCountry.textContent = `${countryName}`)

    generateOptions('USD')
}

initCurrencies('USD')

document.addEventListener('click', closeCurrencyContainer)
currencyOneContainer.addEventListener('click', handleCurrencyContainerVisibility)
currencyTwoContainer.addEventListener('click', handleCurrencyContainerVisibility)
currencyOneOptionsContainer.addEventListener('click', handleCurrencyOneOptions)
currencyTwoOptionsContainer.addEventListener('click', handleCurrencyTwoOptions)
exchangeRateButton.addEventListener('click', showCurrentConverter)
