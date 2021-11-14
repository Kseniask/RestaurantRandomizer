import React from 'react'
export interface IButonContextProps {
  isIndividualClicked: boolean
  setIsIndividualClicked: (clicked: boolean) => void
  isGroupClicked: boolean
  setIsGroupClicked: (clicked: boolean) => void
}

const defaultContext: IButonContextProps = {
  isIndividualClicked: false,
  setIsIndividualClicked: () => {},
  isGroupClicked: false,
  setIsGroupClicked: () => {}
}

export default React.createContext(defaultContext)
