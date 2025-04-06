import React from 'react'
import { Home } from './Components/Home'
import { Create } from './Components/Create'
import { Update } from './Components/Update'

import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </>
  )
}

export default App
