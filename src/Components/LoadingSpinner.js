import burgerImage from '../burger.png'
import { Container } from 'react-bootstrap'

const LoadingSpinner = () => {
  return (
    <Container>
      <div>
        <img src={burgerImage} className='spinner' alt='burgerImage' />
      </div>
    </Container>
  )
}

export default LoadingSpinner
