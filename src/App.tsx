import './App.css'
import { useEffect, useState } from 'react'
import StartButton from './Components/StartButton'
import Result from './Components/Result'
import { Container } from 'react-bootstrap'
import socketService from './Services/SocketService'
import ButtonContext, { IButonContextProps } from './ButtonContext'

function App () {
  const [isIndividualClicked, setIsIndividualClicked] = useState(false)
  const [isGroupClicked, setIsGroupClicked] = useState(false)

  const connectSocket = async () => {
    await socketService.connect('http://localhost:3005')
  }

  useEffect(() => {
    connectSocket()
  }, [])

  const contextValue: IButonContextProps = {
    isIndividualClicked,
    setIsIndividualClicked,
    isGroupClicked,
    setIsGroupClicked
  }

  return (
    <Container>
      {isIndividualClicked ? (
        <ButtonContext.Provider value={contextValue}>
          <Result></Result>
        </ButtonContext.Provider>
      ) : (
        <div className='startPage'>
          <h2 className='intro'>
            Ready for lunch?
            <br />
            Let's try something new today!
          </h2>
          <ButtonContext.Provider value={contextValue}>
            <StartButton
              isGroup={true}
              name='Join the group lunch'
            ></StartButton>{' '}
            <StartButton
              isGroup={false}
              name='Get random place for myself'
            ></StartButton>{' '}
          </ButtonContext.Provider>
        </div>
      )}
    </Container>
  )
}

export default App
