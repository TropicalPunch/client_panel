import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
    state={
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        balance:''
    }

    onSubmit= (e) => {
        //since its a form we must prevent default from be submitted
        e.preventDefault();

        const newClient= this.state;
        //export line made it possible to access : this.props.firestore....
        const { firestore } = this.props;
         
       if(newClient.balance=== ' '){
           newClient.balance = 0;
       }

        // lets export to firestore the new contact with the add() method. first we must mention to which collection {collection: 'clients'}!!!
        firestore.add( {collection: 'clients'}, newClient ).then(()=> 
            //lets redirect the user to the client page:
            this.props.history.push('/')
            )


    }

    onChange= (e)=>{
        this.setState({ 
            [e.target.name]: e.target.value
        })
    }


  render() {
    return (
      <div>
        <div className="row">
            <div classname="col-md-6">
                
                <Link to="/" className="btn btn-link">
                    <i className="fas fa-arrow-circle-left"></i> 
                    {' '} Back to Clients
                </Link>
            </div>
        </div>

            <div className="card">
             <div className="card-header"> Add Client</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                         <label htmlFor="firstName">First Name</label>
                         <input 
                         type="text"
                         className="form-control"
                         name="firstName"
                         minLength="2"
                         required
                         onChange={this.onChange}
                         value={this.state.firstName}
                         />
                        </div>
                        <div className="form-group">
                         <label htmlFor="lastName">Last Name</label>
                         <input 
                         type="text"
                         className="form-control"
                         name="lastName"
                         minLength="2"
                         required
                         onChange={this.onChange}
                         value={this.state.lastName}
                         />
                        </div>

                        <div className="form-group">
                         <label htmlFor="email"> Email </label>
                         <input 
                         type="email"
                         className="form-control"
                         name="email"
                         onChange={this.onChange}
                         value={this.state.email}
                         />
                        </div>

                        <div className="form-group">
                         <label htmlFor="phone">Phone</label>
                         <input 
                         type="text"
                         className="form-control"
                         name="phone"
                         minLength="7"
                         required
                         onChange={this.onChange}
                         value={this.state.phone}
                         />
                        </div>

                        <div className="form-group">
                         <label htmlFor="balance">Balance</label>
                         <input 
                         type="text"
                         className="form-control"
                         name="balance"
                      
                         onChange={this.onChange}
                         value={this.state.balance}
                         />
                        </div>

                        <input type="submit" value="submit" className="btn btn-success btn-block"  />

                    </form>
                </div>
            </div>
             
      </div>
    )
  }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);