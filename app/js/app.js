const currencyOneContainer = document.querySelector('[data-js="currency-one"]')
const currencyTwoContainer = document.querySelector('[data-js="currency-two"]')
const currencyOneOptionsContainer = document.querySelector('[data-js="currency-one-options-container"]')
const currencyTwoOptionsContainer = document.querySelector('[data-js="currency-two-options-container"]')

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
    
    // console.log(flagCode, countryName)
    // return
    currencyImage.setAttribute('src', `https://flagcdn.com/w80/${flagCode}.png`)
    currencyImage.setAttribute('srcset', `https://flagcdn.com/w160/${flagCode}.png 2x`)
    currencyImage.setAttribute('width', '50')

    currencyName.textContent = `${code}`
    currencyCountry.textContent = `${countryName}`
}

const handleCurrencyOneOptions = async event => {
    event.stopPropagation()

    const selectedCurrencyItem = event.target.closest('.currency__content-item')

    if (!selectedCurrencyItem) {
        return
    }

    currencyOneOptionsContainer.classList.remove('show-options')

    const selectedCurrencyElement = selectedCurrencyItem.querySelector('[data-js="currency-name"] h2')
    const selectedCurrency = selectedCurrencyElement.textContent

    changeSelectedBaseCurrency(selectedCurrency)
}

const handleCurrencyTwoOptions = event => {
    event.stopPropagation()

    const selectedCurrencyItem = event.target.closest('.currency__content-item')

    if (!selectedCurrencyItem) {
        return
    }

    currencyTwoOptionsContainer.classList.remove('show-options')

    const selectedCurrencyElement = selectedCurrencyItem.querySelector('[data-js="currency-name"] h2')
    const selectedCurrency = selectedCurrencyElement.textContent

    changeSelectedSecondCurrency(selectedCurrency)
}

initCurrencies('USD')

document.addEventListener('click', closeCurrencyContainer)
currencyOneContainer.addEventListener('click', handleCurrencyContainerVisibility)
currencyTwoContainer.addEventListener('click', handleCurrencyContainerVisibility)
currencyOneOptionsContainer.addEventListener('click', handleCurrencyOneOptions)
currencyTwoOptionsContainer.addEventListener('click', handleCurrencyTwoOptions)
