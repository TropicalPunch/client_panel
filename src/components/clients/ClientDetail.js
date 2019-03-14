// we copied import lines from AddClient.js
import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner.js';

import classnames from 'classnames';

class ClientDetail extends Component {

    state={
        showBalanceUpdate: false,
        balanceUpdateAmount: ''
    };
    //function for submitting the new edited balance (with the new state)
    balanceSubmit= e =>{
        e.preventDefault();
        const {client, firestore} = this.props;
        const {balanceUpdateAmount} =this.state;

        const clientUpdate ={
            balance: parseFloat(balanceUpdateAmount)
        }
         //update to firestore:
        firestore.update({collection:'clients', doc: client.id}, clientUpdate)
    }

    //delete client function + redirecting after (using then)
    onDeleteClick = () =>{
        const {client, firestore} = this.props;
        firestore.delete({collection:'clients', doc: client.id})
        .then(()=> this.props.history.push('/'));
    }

    //function for submitting the new balance value into the state's object=> balanceUpdateAmount
    onChange= e => this.setState( {[e.target.name]: e.target.value} );

  render() {
      //from firebase
    const {client} = this.props;

    const {showBalanceUpdate, balanceUpdateAmount} = this.state;

    //lets create the balance frm update:
    let balanceForm = '';
    if(showBalanceUpdate){
        balanceForm = (
            <form onSubmit={this.balanceSubmit}>
                <div className="input-group">
                    <input  type="text" className="form-control" name="balanceUpdateAmount" /** <=this is the e.target.name */ placeholder="Update Client Blance" value={balanceUpdateAmount} /** <=this is the e.target.value */  onChange={this.onChange}  />
                  
                    <div className="input-group-append">
                        <input   type="submit" className="btn btn-outline-dark" value="update" />
                    </div>

                </div>
            </form>
        )
    }else{
        balanceForm= null;
    }


    if (client) {
        return (
            <div>
              <div className="row">   {/* buttons class */}
                   
                    <div className="col-md-6">
                     {/*back button */}
                        <Link to='/' className="btn btn-link">
                        <i className="fas fa-arrow-circle-left"/> Clients
                        </Link>
                    </div>

                    <div className="col-md-6">
                      
                        <div className=" btn-group btn-block">
                             {/*edit button */}
                            <Link to={`/client/edit/${client.id}`} className="btn btn-outline-info" >
                            <i className="fas fa-edit"/>Edit Client
                            </Link>
                            <div></div>
                             {/*delete button */}
                            <button onClick={this.onDeleteClick} className="btn btn-outline-danger">
                             <i    className="fas fa-backspace"/> Delete Client
                            </button>
                        </div>
                    </div>
              </div>
              <hr/>
                    {/* lets show the clients info with bootstrap card templete: */}
                    <div className="card">

                        <h3 className="card-header">
                        <i className="fas fa-user-astronaut" style={{fontSize:'20px', padding:'5px'}}  ></i>{' '}
                            {client.firstName} {client.lastName}
                        </h3>

                        <div className="card-body">
                         <div className="row">
                              <div className="col-md-8 col-sm-6">
                              <h4>
                                  {/**span will make the id number look faded */}
                                 Client ID:  <span className="text-secondary">{client.id}</span>
                              </h4>
                              </div>

                              <div className="col-md-4 col-sm-6">
                                <h3 className="pull-right">

                                <small>
                                     <a href='#!' onClick={
                                         ()=> this.setState({showBalanceUpdate: !this.showBalanceUpdate})}>
                                        <i className="fas fa-cash-register" style={{fontSize:'20px', color:'green'}}  ></i>
                                     </a>{' '}
                                 </small>
                                 Balance:
                                 <span className={classnames({
                                     'text-danger': client.balance < 0,
                                     'text-success': client.balance === 0,
                                     'text-warning': client.balance > 0

                                 })}>
                                 {parseFloat(client.balance).toFixed(2) } $ 
                                 </span>
                               
                                </h3>
                                {/**we will add soon link to update balance directly */}
                                 {balanceForm}
                              </div>
                         </div>  

                            <hr/>
                            {/**more contact's info  */}
                            <ul className="list-group">
                                <li className="list-group-item"> Email: {client.email} </li>
                                <li className="list-group-item"> Phone: {client.phone} </li>
                            </ul>
                        </div>

                    </div>


            </div>
          );
        } else{
            return <Spinner/>
        }

    }
}
    
 ClientDetail.propTypes={
     firestore:PropTypes.object.isRequired
 }


export default  compose(
    firestoreConnect(props =>[ //we added props because we need to get the id of each client
        { collection:'clients', storeAs:'client', doc: props.match.params.id } // { path: 'name of collection in firebase' } // storeAs- allows us to store the spesific client info in "state.x.y.z.client"// doc: we need to specify which document we want to grab by the id==> match.params.id=== the id in the url!!!
    ]),
    connect((state, props) => ({
      client: state.firestore.ordered.client && state.firestore.ordered.client[0] //client [0] is the first client in the array 
      // enabls access the single client!
    }))
  )(ClientDetail);
    //the name of our component;