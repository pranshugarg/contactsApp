import React, { Component } from 'react';
import ListContacts from './ListContacts'
import { Route } from 'react-router-dom'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    this.setState( (state) => ({
      contacts: state.contacts.filter((c)=> c.id!== contact.id )
    }))

    // Also removes from server or db from where it is fetching.(Not just UI)
    ContactsAPI.remove(contact)
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ( {contacts: state.contacts.concat([ contact ]) }))
      })
    }

  render() {
    return (
      <div>
         <Route exact path='/' render={() => (
          <ListContacts onDeleteContact={this.removeContact}
            contacts={this.state.contacts}  />
         )}/>
        
        <Route path='/create' render = { ({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}/>
        )}/>
      </div>
      
    )
  }
}

export default App;