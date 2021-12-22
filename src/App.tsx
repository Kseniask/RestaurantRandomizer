import './App.css'
import { useState } from 'react'
import StartButton from './Components/StartButton'
import Result from './Components/Result'
import JoinGroup from './Components/JoinGroup'

import { Container } from 'react-bootstrap'
import ButtonContext, { IButonContextProps } from './ButtonContext'

function App () {
  const [isIndividualClicked, setIsIndividualClicked] = useState(false)
  const [isGroupClicked, setIsGroupClicked] = useState(false)
  const [isGroupSelectionReady, setIsGroupSelectionReady] = useState(false)
  const contextValue: IButonContextProps = {
    isIndividualClicked,
    setIsIndividualClicked,
    isGroupClicked,
    setIsGroupClicked,
    isGroupSelectionReady,
    setIsGroupSelectionReady
  }

  function showClickedResult () {
    if (isIndividualClicked) {
      return (
        <ButtonContext.Provider value={contextValue}>
          <Result restaurant={null}></Result>
        </ButtonContext.Provider>
      )
    } else if (isGroupClicked) {
      return (
        <ButtonContext.Provider value={contextValue}>
          <JoinGroup />
        </ButtonContext.Provider>
      )
    }
  }

  return (
    <Container>
      {isIndividualClicked || isGroupClicked ? (
        showClickedResult()
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
