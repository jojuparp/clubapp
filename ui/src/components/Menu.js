import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import ClubForm from './ClubForm'
import ClubsView from './ClubsView'

const Menu = ({ clubs, setClubs, members, setMembers }) => {

  const style = {
    padding: 10
  }

  return(

    <Router>

      <div>
        <Link style={style} to='/'>New club</Link>
        <Link  style={style} to='/clubs'>All clubs</Link>
      </div>

      <Route exact path='/' render={() =>
         <ClubForm
          clubs={clubs}
          setClubs={setClubs}
          members={members}
          setMembers={setMembers}
          />} />
      <Route exact path='/clubs' render={() => <ClubsView clubs={clubs} members={members}/>} />
      
    </Router>
  )
}

export default Menu
