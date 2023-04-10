const APIKey = '6a00e715b1886dc966bf1b0d'

const getUrl = selectedCurrency => `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${selectedCurrency}`

const getErrorMessage = errorType => ({
  'unsupported-code': 'A moeda não existe em nosso banco de dados.',
  'malformed-request': 'O endpoint do seu request precisa seguir a estrutura a seguir https://v6.exchangerate-api.com/v6/API/latest/USD',
  'invalid-key': 'A chave da API não é válida.',
  'inactive-account': 'Seu endereço de email não foi confirmado.',
  'quota-reached': 'Sua cota alcançou o limite de requests permitido no seu plano atual.'
})[errorType] || 'Não foi possível encontrar a moeda.'

const fetchExchangeRate = async selectedCurrency => {
  try {
    const url = getUrl(selectedCurrency)
    const response = await fetch(url)
    const exchangeRateData = await response.json()

    if (exchangeRateData.result === 'error') {
      const errorMessage = getErrorMessage(exchangeRateData['error-type'])
      throw new Error (errorMessage)
    }

    if (!response.ok) {
      throw new Error ('Sua conexão falhou. Não foi possível obter as informações.')
    }

    return state.setExchangeRate(exchangeRateData)

  } catch (error) {
    console.log(error)
  }
}

const getCountries = async () => {
  try {
    const request = await fetch('./app/json/currencies.json')
    const exchangeInfo = request.json()

    if (!request.ok) {
      throw new Error ('Não foi possível obter as informações da moeda.')
    }

    return exchangeInfo
  } catch ({error, message}) {
    console.log(`${error}: ${message}`)
  }
}

const state = (() => {
  let exchangeRate = {}

  return {
    getExchangeRate: () => exchangeRate,
    setExchangeRate: newExchangeRate => {
      if (!newExchangeRate.conversion_rates) {
        showAlert({ message: 'Objeto precisa ter uma propriedade conversion_rates'})
        return
      }

      exchangeRate = newExchangeRate
      return exchangeRate
    }
  }
})()