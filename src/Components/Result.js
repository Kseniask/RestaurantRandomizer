import { useState, useEffect, useContext } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { Container, Button } from 'react-bootstrap'
import Gallery from './Gallery'
import Rating from 'react-rating-stars-component'
import ButtonContext from '../ButtonContext'

export const getRandomRestaurantResponse = async () => {
  let position = await getLocation()
  const longitude = position ? position.coords.longitude : -123.118315
  const latitude = position ? position.coords.latitude : 49.287663
  const restaurantSelection = await fetch(
    `http://localhost:3005/random-restaurant/${longitude}/${latitude}`
  )
  return restaurantSelection.json()
}

function getLocation () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      response => resolve(response),
      response => resolve(null)
    )
  })
}

const Result = ({ restaurant }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [restaurantSelection, setRestaurant] = useState()
  const {
    setIsIndividualClicked,
    setIsGroupClicked,
    setIsGroupSelectionReady
  } = useContext(ButtonContext)

  useEffect(() => {
    setIsLoaded(false)
    async function setRestaurantAsync () {
      const randomPlace = await getRandomRestaurantResponse()
      setRestaurant(randomPlace)
    }
    if (restaurant) {
      setRestaurant(restaurant)
      setIsLoaded(true)
    } else {
      setRestaurantAsync()
    }
  }, [])

  useEffect(() => {
    if (restaurantSelection !== undefined) {
      setIsLoaded(true)
    }
  }, [restaurantSelection])

  return (
    <Container>
      {isLoaded && restaurantSelection ? (
        <Container>
          <h2>
            {restaurantSelection.name}
            <span>&nbsp;({restaurantSelection.price})</span>
          </h2>
          <Rating
            count={5}
            edit={false}
            emptyIcon={<i className='far fa-star'></i>}
            fullIcon={<i className='fa fa-star'></i>}
            activeColor='#ffd700'
            value={restaurantSelection.rating}
            size={25}
          ></Rating>
          <Gallery id={restaurantSelection.id}></Gallery>
          <h5>
            More info <a href={restaurantSelection.url}>HERE</a>
          </h5>
          <div className='startButton'>
            <Button
              variant='info'
              onClick={() => {
                setIsIndividualClicked(false)
                setIsGroupClicked()
                setIsGroupSelectionReady()
              }}
            >
              Back
            </Button>
          </div>
        </Container>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </Container>
  )
}

export default Result
