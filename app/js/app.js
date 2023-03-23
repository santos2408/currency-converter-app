const currencyOneContainer = document.querySelector('[data-js="currency-one"]')
const currencyTwoContainer = document.querySelector('[data-js="currency-two"]')
const currencyOneOptionsContainer = document.querySelector('[data-js="currency-one-options-container"]')
const currencyTwoOptionsContainer = document.querySelector('[data-js="currency-two-options-container"]')

currencyOneContainer.addEventListener('click', () => {
    currencyOneOptionsContainer.classList.toggle('show-options')
})

currencyTwoContainer.addEventListener('click', () => {
    currencyTwoOptionsContainer.classList.toggle('show-options')
})