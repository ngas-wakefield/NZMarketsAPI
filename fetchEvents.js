require('dotenv').config()
const fs = require('fs')

const baseUrl = 'https://api.eventfinda.co.nz/v2/events.json'
const category = 194
const locationSlug = 'new-zealand'
const rows = 20 // Max allowed by API
const totalResults = 211 // Total count from API
const username = process.env.EVENTFINDA_USERNAME // Replace with your Eventfinda API username
const apiKey = process.env.EVENTFINDA_API_KEY // Replace with your API key
const auth = 'Basic ' + Buffer.from(`${username}:${apiKey}`).toString('base64')

async function fetchAllEvents() {
  let allEvents = []

  for (let offset = 0; offset < totalResults; offset += rows) {
    const url = `${baseUrl}?category=${category}&location_slug=${locationSlug}&rows=${rows}&offset=${offset}`

    try {
      const response = await fetch(url, {
        headers: { Authorization: auth },
      })
      const data = await response.json()

      if (data.events) {
        allEvents = allEvents.concat(data.events)
      }

      console.log(`Fetched ${data.events.length} events (offset: ${offset})`)
    } catch (error) {
      console.error('Error fetching data:', error)
      break
    }
  }

  // Save all results to a JSON file
  fs.writeFileSync('events.json', JSON.stringify(allEvents, null, 2))
  console.log('Saved all events to events.json')
}

fetchAllEvents()
