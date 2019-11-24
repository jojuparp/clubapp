import React, { useState } from 'react'
import { useField } from '../hooks/index'

import clubService from '../services/clubService'
import memberService from '../services/memberService'

const ClubForm = ({ clubs, setClubs, members, setMembers }) => {

  const clubField = useField('text')
  const memberField = useField('text')

  const [newMembers, setNewMembers] = useState([])

  const addClub = async event => {
    event.preventDefault()
    if (!window.confirm(`add club ${clubField.value} with members ${newMembers.join(', ')}`)) return

    const clubObject = {
      name: clubField.value
    }


    clubService
      .create(clubObject)
      .then(response => {
        setClubs(clubs.concat(response))
        clubService.getClubs()
          .then(newClubs => {
            setClubs(newClubs)
          })
        clubField.reset()
        memberField.reset()
      })
      .catch(error => console.log(error))

    newMembers.map( newMember => {

      const memberObject = {
        name: newMember,
        clubId: clubs.length+1
      }

      memberService
        .create(memberObject)
        .then(response => {
          setMembers(members.concat(response))
          memberService.getMembers()
            .then(newMembers => {
              setMembers(newMembers)
            })
        })
        .catch(error => console.log(error))
    })
    setNewMembers([])
  }

  const addMember = event => {
    event.preventDefault()
    setNewMembers(newMembers.concat(memberField.value))
    memberField.reset()
  }

  return(
    <div>
      <h2>Please add a club and members for it</h2>

      <form>
        name of new club: <br/>
        <input
          value={clubField.value}
          onChange={clubField.onChange}
        /> <br />
        add member to club: <br/>
        <input
          value={memberField.value}
          onChange={memberField.onChange}
        /> <button onClick={addMember}>add member</button>
        <br/>
        members to be added: {newMembers.join(', ')}<br/>
        <button onClick={addClub}>add club and members</button>
      </form>
    </div>
    
  )
}

export default ClubForm