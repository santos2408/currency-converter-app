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

const loadCurrentCurrencyOne = async () => {
    const currencyImageContainer = document.querySelector('[data-js="currency-content-image"]')
    const currencyNameContainer = document.querySelector('[data-js="currency-name"]')
    const currencyIconContainer = document.querySelector('[data-js="currency-icon"]')

    const { base_code} = await getExchangeRate()
    const countries = await getCountries()

    const { _, countryName } = countries.find(country => country.code === base_code)
    const flagCode = base_code.slice(0, 2).toLowerCase()

    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const span = document.createElement('span')
    const icon = document.createElement('i')

    img.setAttribute('src', `https://flagcdn.com/w80/${flagCode}.png`)
    img.setAttribute('srcset', `https://flagcdn.com/w160/${flagCode}.png 2x`)
    img.setAttribute('width', '50')

    h2.textContent = `${base_code}`
    span.textContent = `${countryName}`
    
    icon.classList.add('ri-arrow-right-s-line')

    currencyImageContainer.append(img)
    currencyNameContainer.append(h2, span)
    currencyIconContainer.append(icon)
}

loadCurrentCurrencyOne()
generateOptions()

currencyOneOptionsContainer.addEventListener('click', async event => {
    event.stopPropagation()

    const selectedCurrencyElement = event.target.closest('.currency__content-item')
    const selectedCurrency = 

    console.log(selectedCurrencyElement)

    return

    const { conversion_rates } = await getExchangeRate(selectedCurrencyElement)
    
    if (selectedCurrencyElement) {
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
