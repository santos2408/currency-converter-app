const APIKey = '6a00e715b1886dc966bf1b0d'

const getExchangeRate = async () => {
  try {
    const request = await fetch(`https://v6.exchangerate-api.com/v6/${APIKey}/latest/BRL`)
    const exchangeRate = await request.json()

    if (!request.ok) {
      throw new Error ('Não foi possível encontrar a moeda.')
    }
    return exchangeRate

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
