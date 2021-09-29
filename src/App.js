import './App.css'
import { createContext, useState } from 'react'
import StartButton from './Components/StartButton'
import Result from './Components/Result'
import { Container } from 'react-bootstrap'
// import ButtonContext from '../src/Components/ButtonContext'

export const ButtonContext = createContext()

function App () {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <Container>
      {isClicked ? (
        <ButtonContext.Provider value={setIsClicked}>
          <Result></Result>
        </ButtonContext.Provider>
      ) : (
        <ButtonContext.Provider value={setIsClicked}>
          <StartButton></StartButton>{' '}
        </ButtonContext.Provider>
      )}
    </Container>
  )
}

export default App
