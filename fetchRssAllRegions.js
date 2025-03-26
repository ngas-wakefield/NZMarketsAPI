const fs = require('fs')
const { parse } = require('rss-to-json')

const regions = [
  { id: 1, name: 'Northland' },
  { id: 2, name: 'Auckland' },
  { id: 3, name: 'The Coromandel' },
  { id: 4, name: 'Hawkes Bay Gisborne' },
  { id: 5, name: 'Waikato' },
  { id: 6, name: 'Bay of Plenty' },
  { id: 7, name: 'Taranaki' },
  { id: 8, name: 'Manawatu Whanganui' },
  { id: 9, name: 'Wellington Region' },
  { id: 10, name: 'Nelson Tasman' },
  { id: 11, name: 'Marlborough' },
  { id: 12, name: 'West Coast' },
  { id: 13, name: 'Canterbury' },
  { id: 14, name: 'Otago' },
]

;(async () => {
  for (const region of regions) {
    try {
      const rss = await parse(
        `https://www.eventfinda.co.nz/feed/events/${region.name
          .toLowerCase()
          .replace(/\s+/g, '-')}/markets-fairs/this-weekend.rss`
      )
      const fileName = `rss_${region.name
        .replace(/\s+/g, '_')
        .toLowerCase()}.json`
      fs.writeFileSync(fileName, JSON.stringify(rss, null, 2))
      console.log(`Saved ${fileName}`)
    } catch (error) {
      console.error(`Failed to fetch RSS for ${region.name}:`, error)
    }
  }
})()
