require('dotenv').config()

async function getMarkets(location = '-36.8485,174.7633', radius = 5000) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=point_of_interest&keyword=farmers+market+local&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    const markets = data.results.map((result) => ({
      id: result.place_id,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      rating: result.rating,
      icon: result.icon,
      vicinity: result.vicinity,
      formatted_address: result.formatted_address,
      place_id: result.place_id,
      geometry: result.geometry,
      types: result.types,
      opening_hours: result.opening_hours,
      photos: result.photos,
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      website: result.website,
      name: result.name,
      address: result.vicinity,
    }))
    console.log(markets) // Processed list of markets
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching markets:', error.message)
    } else {
      console.error('Unknown error:', error)
    }
  }
}

getMarkets()
