import { Container, Button } from 'react-bootstrap'
import { ButtonContext } from '../App'
const StartButton = () => {
  return (
    <Container className='startPage'>
      <h2 className='intro'>
        Ready for lunch?
        <br />
        Let's try something new today!
      </h2>
      <ButtonContext.Consumer>
        {setIsClicked => (
          <div className='startButton'>
            <Button variant='info' onClick={() => setIsClicked(true)}>
              Find a place
            </Button>
          </div>
        )}
      </ButtonContext.Consumer>
    </Container>
  )
}

export default StartButton
