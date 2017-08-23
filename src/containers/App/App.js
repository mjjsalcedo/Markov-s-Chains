import React from 'react'
import CellPhoneContainer from '../cellPhoneContainer'
import GraphicsContainer from '../graphicsContainer'
import StoryContainer from '../storyContainer'
import InventoryContainer from '../inventoryContainer'

const App = () => (
  <div className="mainContainer">
  <CellPhoneContainer/>
  <GraphicsContainer/>
  <InventoryContainer/>
  <StoryContainer/>
  </div>
)

export default App

