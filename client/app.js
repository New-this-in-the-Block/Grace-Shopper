import React from 'react'
import Nav from './components/Nav'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Nav />
      <div id='spacer'/>
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
