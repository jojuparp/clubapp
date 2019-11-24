import React, { useState } from 'react'

import clubService from '../services/clubService'


const ClubsView = ({ clubs, members }) => {

  const [clubMembers, setClubMembers] = useState([])

  const rows = () => clubs.map( club => {

    const clubMembers = members.filter(member => member.clubId === club.id)

    const memberRows = () => clubMembers.map(member => <li key={member.id}>{member.name}</li>)
    

    return(
      <div key={club.id}>
      <p>{club.name}</p>
      {memberRows()}
      </div>
    )
  })

  /* const showClubsAndMembers = () => clubs.map( async club => {

    let clubMembers = await clubService.getClubMembers(club.id)
    console.log(clubMembers)
    

    return(
    <div>
      <h3>{club.name}</h3>
      {clubMembers}
    </div>
    )
  }) */

  return(

    <div>
      <h2>Clubs and their members</h2>
      {rows()}
    </div>

  )
}

export default ClubsView