import React, { useState, useEffect } from 'react'

import Menu from './components/Menu'

import clubService from './services/clubService'
import memberService from './services/memberService'

const App = () => {

  const [clubs, setClubs] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
    clubService.getClubs()
      .then(initialClubs => {
        setClubs(initialClubs)
      })
  }, [])

  useEffect(() => {
    memberService.getMembers()
      .then(initialMembers => {
        setMembers(initialMembers)
      })
  }, [])


  return (
    <div>
      
      <Menu
        clubs={clubs}
        setClubs={setClubs}
        members={members}
        setMembers={setMembers}
      />
      
    </div>
  )
}

export default App
