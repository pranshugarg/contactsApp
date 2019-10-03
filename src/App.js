import React, { Component } from 'react';
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    screen: 'create', // list, create
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

  render() {
    return (
      <div>
       
       {this.state.screen === 'list' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}
        
        {this.state.screen === 'create' && (
          <CreateContact/>
        )}

      </div>
      
    )
    // state based content rendering
  }
}

export default App;