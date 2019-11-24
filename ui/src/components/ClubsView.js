import React, { useState } from 'react'

import clubService from '../services/clubService'


const ClubsView = ({ clubs, members }) => {

  const [clubMembers, setClubMembers] = useState([])

  /* const rows = () => clubs.map( club => {

    const clubMembers = members.filter(member => member.clubId === club.id)

    const memberRows = () => clubMembers.map(member => <li key={member.id}>{member.name}</li>)
    

    return(
      <div key={club.id}>
      <p>{club.name}</p>
      {memberRows()}
      </div>
    )
  }) */

  const showClubMembers = () => clubs.map( club => {

    clubService
      .getClubMembers(club.id)
      .then(response => {
        setClubMembers(response)
      }).catch(error => console.log(error))

  const memberRows = () => clubMembers.map(member => <li>{member}</li>)

    return(
      <div>
        <h3>{club.name}</h3>
        {memberRows()}
      </div>
    )
    
  })

  return(

    <div>
      <h2>Clubs and their members</h2>
      {/* rows() */}
      {showClubMembers()}
    </div>

  )
}

export default ClubsView