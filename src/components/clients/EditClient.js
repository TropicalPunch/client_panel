// we copied import lines from ClientDetail.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner.js';



class EditClient extends Component {
    constructor(props){
        super(props);
        //create ref's for each client property:
        this.firstNameInput= React.createRef();
        this.lastNameInput= React.createRef();
        this.emailInput= React.createRef();
        this.phoneInput= React.createRef();
        this.balanceInput= React.createRef();

    }

    onSubmit = e =>{
        e.preventDefault();
        const {client,firestore} = this.props;

        const updClient={

            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value

        }

        firestore.update( {collection:'clients', doc:client.id},updClient)
        .then(this.props.history.push('/'));

    }

  render() {
    const { client } = this.props;

    if (client) {  
     return  (
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
             <div className="card-header"> Edit Client</div>
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
                         //onChange={this.onChange}
                         ref={this.firstNameInput}
                         defaultValue={client.firstName}
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
                         //onChange={this.onChange}
                         ref={this.lastNameInput}
                         defaultValue={client.lastName}
                         />
                        </div>

                        <div className="form-group">
                         <label htmlFor="email"> Email </label>
                         <input 
                         type="email"
                         className="form-control"
                         name="email"
                        // onChange={this.onChange}
                        ref={this.emailInput}
                        defaultValue={client.email}
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
                         //onChange={this.onChange}
                         ref={this.phoneInput}
                         defaultValue={client.phone}
                         />
                        </div>

                        <div className="form-group">
                         <label htmlFor="balance">Balance</label>
                         <input 
                         type="text"
                         className="form-control"
                         name="balance"
                      
                        // onChange={this.onChange}
                        ref={this.balanceInput}
                        defaultValue={client.balance}
                         />
                        </div>

                        <input type="submit" value="submit" className="btn btn-success btn-block"  />

                    </form>
                </div>
            </div>
             
      </div>
          )
          
    }else{
        return <Spinner />;
    }
  }
}

  
EditClient.propTypes={
    firestore:PropTypes.object.isRequired
};


export default compose(
   firestoreConnect(props =>[ //we added props because we need to get the id of each client
       { collection:'clients', storeAs:'client', doc: props.match.params.id } // { path: 'name of collection in firebase' } // storeAs- allows us to store the spesific client info in "state.x.y.z.client"// doc: we need to specify which document we want to grab by the id==> match.params.id=== the id in the url!!!
   ]),
   connect(({firestore: { ordered } }, props) => ({
     client: ordered.client && ordered.client[0] //client [0] is the first client in the array 
     // enabls access the single client!
   }))
 )(EditClient);
