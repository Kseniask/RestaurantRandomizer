import { createContext } from 'react'
const ButtonContext = createContext({
  isClicked: false,
  setIsClicked: () => {}
})

export default ButtonContext
