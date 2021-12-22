import { Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import SocketService from '../Services/SocketService'
import { useState, useContext } from 'react'
import LoadingSpinner from './LoadingSpinner'
import Result from './Result'
import ButtonContext from '../ButtonContext'

const JoinGroup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isGroupSelectionReady, setIsGroupSelectionReady } = useContext(
    ButtonContext
  )
  const [groupName, setGroupName] = useState('')
  const [groupRestaurant, setGroupRestaurant] = useState('')
  async function joinGroupLunch () {
    setIsLoading(true)
    await SocketService.connect('http://localhost:3005')
    const restaurantInGroup = await SocketService.joinRoom(groupName)
    if (restaurantInGroup) {
      setGroupRestaurant(restaurantInGroup)
      setIsLoading(false)
      setIsGroupSelectionReady(true)
    }
  }

  return isLoading ? (
    <LoadingSpinner></LoadingSpinner>
  ) : isGroupSelectionReady ? (
    <Result restaurant={groupRestaurant}> </Result>
  ) : (
    <Container className='inputPage'>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Company name'
          onChange={e => setGroupName(e.target.value)}
          aria-label='room_name'
          aria-describedby='joinGroupBtn'
        />
        <Button
          variant='info'
          id='joinGroupBtn'
          onClick={e => joinGroupLunch()}
        >
          Join Lunch
        </Button>
      </InputGroup>
    </Container>
  )
}

export default JoinGroup
