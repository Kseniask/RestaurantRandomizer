import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { Container, Button } from 'react-bootstrap'
import Gallery from './Gallery'
import Rating from 'react-rating-stars-component'
import { ButtonContext } from '../App'

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
    getRestaurantList()
  }, [])

  useEffect(() => {
    if (restaurantList.length > 0) generateRandomRestaurant()
  }, [restaurantList])

  useEffect(() => {
    if (restaurant !== undefined) {
      setIsLoaded(true)
    }
  }, [restaurant])

  const getRestaurantResponse = async position => {
    const longitude = position ? position.coords.longitude : -123.118315
    const latitude = position ? position.coords.latitude : 49.287663
    const response = await fetch(
      `https://whats-for-lunch-backend.herokuapp.com/restaurants/${longitude}/${latitude}`
    )
    const jsonResponse = await response.json()
    const list = jsonResponse.businesses
    setRestaurantList(list)
  }
  const getRestaurantList = async () => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        await getRestaurantResponse(position)
      },
      async () => {
        await getRestaurantResponse()
      }
    )
  }

  const generateRandomRestaurant = async () => {
    let randomIndex, randomPlace
    let isBanned = true
    while (isBanned) {
      randomIndex = Math.floor(Math.random() * restaurantList.length)
      randomPlace = restaurantList[randomIndex]
      isBanned = bannedCategories.includes(randomPlace.categories[0].alias)
    }
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
            size={25}
          ></Rating>
          <Gallery id={restaurant.id}></Gallery>
          <h5>
            More info <a href={restaurant.url}>HERE</a>
          </h5>
          <ButtonContext.Consumer>
            {setIsClicked => (
              <div className='startButton'>
                <Button variant='info' onClick={() => setIsClicked(false)}>
                  Back
                </Button>
              </div>
            )}
          </ButtonContext.Consumer>
        </Container>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </Container>
  )
}

export default Result
