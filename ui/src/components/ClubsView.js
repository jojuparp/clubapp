import React, { useState } from 'react'

import clubService from '../services/clubService'

const ClubsView = ({ clubs, members }) => {

  const clubRows = () => clubs.map( club => {

    const clubMembers = members.filter(member => member.clubId === club.id)

    const memberRows = () => clubMembers.map(member => <li key={member.id}>{member.name}</li>)
    

    return(
      <div key={club.id}>
      <p>{club.name}</p>
      {memberRows()}
      </div>
    )
  })

  return(

    <div>
      <h2>Clubs and their members</h2>
      {clubRows()}
    </div>
  )
}

export default ClubsView