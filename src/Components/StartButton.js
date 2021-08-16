import { Container, Button } from 'react-bootstrap'
import { ButtonContext } from '../App'
const StartButton = () => {
  return (
    <Container className='startPage'>
      <h2>
        Ready for lunch?
        <br />
        Let's try something new today!
      </h2>
      <ButtonContext.Consumer>
        {setIsClicked => (
          <Container className='startButton'>
            <Button variant='info' onClick={() => setIsClicked(true)}>
              Find a place
            </Button>
          </Container>
        )}
      </ButtonContext.Consumer>
    </Container>
  )
}

export default StartButton
