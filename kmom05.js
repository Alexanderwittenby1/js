const selectElement = document.getElementById('mySelect')
const deleteBtn = document.getElementById('deleteBtn')
const mySelect = document.getElementById('mySelect')

// Hämta data från Sverige.
const urlSwe = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/sweden.json'
const dataSwe = await fetch(urlSwe)
const jsonSwe = await dataSwe.json()

// Hämta data från Norge.
const urlNor = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/norway.json'
const dataNor = await fetch(urlNor)
const jsonNor = await dataNor.json()

// Hämta data från Danmark.
const urlDen = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/denmark.json'
const dataDen = await fetch(urlDen)
const jsonDen = await dataDen.json()

const storage = window.sessionStorage
console.log(storage)

// Sverige resultat.
const swedenResult = document.getElementById('swedenResult')
let swedenValue = storage.getItem('sweden') || 0

// Norge resultat.
const norwayResult = document.getElementById('norwayResult')
let norwayValue = storage.getItem('norway') || 0

// Danmark resultat.
const denmarkResult = document.getElementById('denmarkResult')
let denmarkValue = storage.getItem('denmark') || 0

let selectedYear = ''

mySelect.addEventListener('change', function (event) {
  selectedYear = event.target.value
  console.log(selectedYear)
  addToTable(selectedYear)
})

for (let year = 1900; year <= 2019; year++) {
  const option = document.createElement('option')
  option.value = year
  option.text = year
  selectElement.add(option)
}

/**
 * Function that adds information to the table.
 * @param {number} selectedYear The selected year.
 * @returns {void}
 */
function addToTable (selectedYear) {
  const table = document.getElementById('myTable')

  if (selectedYear) {
    const collectedData = [
      { name: 'Denmark', data: jsonDen.data },
      { name: 'Norway', data: jsonNor.data },
      { name: 'Sweden', data: jsonSwe.data }
    ]

    // Ta bort befintliga rader utom header
    while (table.rows.length > 1) {
      table.deleteRow(1)
    }

    let minCO2percapita = Number.POSITIVE_INFINITY
    let winningCountryPerCapita = ''

    let minCO2 = Number.POSITIVE_INFINITY
    let winningCountry = ''

    let minCoalCo2 = Number.POSITIVE_INFINITY
    let winningminCoalCo2 = ''

    for (const data of collectedData) {
      const dataFound = data.data.find((entry) => entry.year === parseInt(selectedYear))

      if (dataFound) {
        const row = table.insertRow(1)

        const cellYear = row.insertCell(0)
        cellYear.innerHTML = selectedYear

        const cellCountry = row.insertCell(1)
        cellCountry.innerHTML = data.name

        const cellCO2 = row.insertCell(2)
        cellCO2.innerHTML = dataFound.co2

        const cellCO2PerCapita = row.insertCell(3)
        cellCO2PerCapita.innerHTML = dataFound.co2_per_capita

        const cellCoalCO2 = row.insertCell(4)
        cellCoalCO2.innerHTML = dataFound.coal_co2

        const cellPopulation = row.insertCell(5)
        cellPopulation.innerHTML = dataFound.population

        // Här hittar vi det lägsta CO2-värdet och vinnande landet
        if (dataFound.co2 < minCO2) {
          minCO2 = dataFound.co2
          winningCountry = data.name
        }

        if (dataFound.co2_per_capita < minCO2percapita) {
          minCO2percapita = dataFound.co2_per_capita
          winningCountryPerCapita = data.name
        }

        if (dataFound.coal_co2 < minCoalCo2) {
          minCoalCo2 = dataFound.coal_co2
          winningminCoalCo2 = data.name
        }
      }
    }

    console.log(`Det lägsta CO2-värdet är ${minCO2} för landet ${winningCountry}`)
    console.log(`Det lägsta CO2-PerCapita är ${minCO2percapita} för landet ${winningCountryPerCapita} `)
    console.log(`Det lägsta CO2-PerCapita är ${minCoalCo2} för landet ${winningminCoalCo2} `)

    if (winningCountryPerCapita) {
      for (let i = 1; i < table.rows.length; i++) {
        const currentRow = table.rows[i]
        const countryCell = currentRow.cells[1]

        if (countryCell.innerHTML === winningCountryPerCapita) {
          countryCell.classList.add('winner')
        }

        if (countryCell.innerHTML === winningCountry) {
          countryCell.classList.add('winner')

          if (winningCountry.toLowerCase() === 'sweden') {
            swedenValue++
          } else if (winningCountry.toLowerCase() === 'norway') {
            norwayValue++
          } else if (winningCountry.toLowerCase() === 'denmark') {
            denmarkValue++
          }

          if (winningCountryPerCapita.toLowerCase() === 'sweden') {
            swedenValue++
          } else if (winningCountryPerCapita.toLowerCase() === 'norway') {
            norwayValue++
          } else if (winningCountryPerCapita.toLowerCase() === 'denmark') {
            denmarkValue++
          }

          if (winningminCoalCo2.toLowerCase() === 'sweden') {
            swedenValue++
          } else if (winningminCoalCo2.toLowerCase() === 'norway') {
            norwayValue++
          } else if (winningminCoalCo2.toLowerCase() === 'denmark') {
            denmarkValue++
          }
        }
        addToResult()
      }
    }
  }
}

// Skriv ut datan i consolen.
/**
 * Function that prints the data in the console.
 * @param {Array} data1 Array.
 * @param {Array} data2 Array.
 * @param {Array} data3 Array.
 */
function printInConsole (data1, data2, data3) {
  console.log(data1, data2, data3)
}

deleteBtn.addEventListener('click', function (event) {
  storage.clear()
  swedenValue = 0
  norwayValue = 0
  denmarkValue = 0
  addToResult()
})

/**
 * Function that adds the result.
 * @returns {void}
 */
function addToResult () {
  // Update individual country results
  swedenResult.innerHTML = swedenValue
  norwayResult.innerHTML = norwayValue
  denmarkResult.innerHTML = denmarkValue

  // Update highscore table
  const highscoreTable = document.getElementById('highscoreTable')
  const swedenHighscoreCell = highscoreTable.rows[1].cells[0]
  const norwayHighscoreCell = highscoreTable.rows[1].cells[1]
  const denmarkHighscoreCell = highscoreTable.rows[1].cells[2]

  swedenHighscoreCell.innerHTML = swedenValue
  norwayHighscoreCell.innerHTML = norwayValue
  denmarkHighscoreCell.innerHTML = denmarkValue

  storage.setItem('sweden', swedenValue)
  storage.setItem('norway', norwayValue)
  storage.setItem('denmark', denmarkValue)
}

printInConsole(jsonDen)
