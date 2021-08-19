import burgerImage from '../burger.png'
import { Container } from 'react-bootstrap'

const LoadingSpinner = () => {
  return (
    <Container>
      <div className='spinner'>
        <img src={burgerImage} alt='burgerImage' />
      </div>
    </Container>
  )
}

export default LoadingSpinner
