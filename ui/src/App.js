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



//for debugging
const showClubs = () => clubs.map( club => <p key={club.id}>{club.name}</p>)
const showMembers = () => members.map( member => <p key={member.id}>{member.name}</p>)

  return (
    <div>
      
      <Menu
        clubs={clubs}
        setClubs={setClubs}
        members={members}
        setMembers={setMembers}
      />

      {/* {showClubs()}
      {showMembers()} */}
      
    </div>
  )
}

export default App
