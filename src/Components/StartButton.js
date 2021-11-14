import { Button } from 'react-bootstrap'
import { useContext } from 'react'
import ButtonContext from '../ButtonContext'

const StartButton = ({ isGroup, name }) => {
  const { setIsIndividualClicked, setIsGroupClicked } = useContext(
    ButtonContext
  )

  return (
    <div className='startButton'>
      <Button
        variant='info'
        onClick={() =>
          isGroup ? setIsGroupClicked(true) : setIsIndividualClicked(true)
        }
      >
        {name}
      </Button>
    </div>
  )
}

export default StartButton
