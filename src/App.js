import React, { Component } from 'react'
import Contacts from './Contacts'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Nav from './Nav'
import ContactDetails from './ContactDetails'
import Home from './Home'
import About from './About'

import './style.css'
import contacts from './data.json'

export default class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    axios
      .get(
        'https://randomuser.me/api/?seed=myrandomdata&inc=name,email,login,gender,dob,picture&results=10'
      )
      .then(data => {
        console.log(data.data.results)
        this.setState({
          contacts: data.data.results
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { contacts } = this.state
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/contacts/:id'>
            <ContactDetails contacts={contacts} />
          </Route>
          <Route path='/contacts'>
            <Contacts contacts={contacts} />
          </Route>
        </Switch>
      </Router>
    )
  }
}
