import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { Container } from 'react-bootstrap'
import Gallery from './Gallery'
import Rating from 'react-rating-stars-component'

const Result = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [restaurant, setRestaurant] = useState()
  const [restaurantList, setRestaurantList] = useState([])

  const bannedCategories = [
    'icecream',
    'hotdogs',
    'cafes',
    'fondue',
    'fastfood',
    'coffee',
    'tobaccoshops',
    'convenience',
    'grocery'
  ]

  useEffect(() => {
    setIsLoaded(false)
    getRestaurants()
  }, [])

  useEffect(() => {
    if (restaurantList.length > 0) generateRandomRestaurant()
  }, [restaurantList])

  useEffect(() => {
    if (restaurant !== undefined) {
      console.log(restaurant)
      setIsLoaded(true)
    }
  }, [restaurant])

  const getRestaurants = async () => {
    let response
    navigator.geolocation.getCurrentPosition(async position => {
      response = await fetch(
        `http://localhost:3001/restaurants/${position.coords.longitude}/${position.coords.latitude}`
      )
      const jsonResponse = await response.json()
      const list = jsonResponse.businesses
      console.log(jsonResponse)
      setRestaurantList(list)
    })
  }

  const generateRandomRestaurant = async () => {
    let randomIndex, randomPlace
    let isBanned = true
    while (isBanned) {
      randomIndex = Math.floor(Math.random() * restaurantList.length)
      randomPlace = restaurantList[randomIndex]
      isBanned = bannedCategories.includes(randomPlace.categories[0].alias)
    }
    console.log(randomPlace)
    setRestaurant(randomPlace)
  }

  return (
    <Container>
      {isLoaded ? (
        <Container>
          <h2>
            {restaurant.name}
            <span>&nbsp;({restaurant.price})</span>
          </h2>
          <Rating
            count={5}
            edit={false}
            emptyIcon={<i className='far fa-star'></i>}
            fullIcon={<i className='fa fa-star'></i>}
            activeColor='#ffd700'
            value={restaurant.rating}
            size='25'
          ></Rating>
          <Gallery id={restaurant.id}></Gallery>
          <h5>
            More info <a href={restaurant.url}>HERE</a>
          </h5>
        </Container>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </Container>
  )
}

export default Result
