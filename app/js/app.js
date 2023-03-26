const currencyOneContainer = document.querySelector('[data-js="currency-one"]')
const currencyTwoContainer = document.querySelector('[data-js="currency-two"]')
const currencyOneOptionsContainer = document.querySelector('[data-js="currency-one-options-container"]')
const currencyTwoOptionsContainer = document.querySelector('[data-js="currency-two-options-container"]')

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