import React, { Component } from 'react';

import {Link} from 'react-router-dom';
//copy from github : https://github.com/prescottprue/react-redux-firebase  ==>@load data

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

import classnames from 'classnames';

class Clients extends Component {
//state for total balance:
    state= {
        totalOwed: null
    }

    static getDerivedStateFromProps(props,state){
        const {clients} = props;

        if (clients) {
            //addthe balances of all the clients:
            const total = clients.reduce((total, client) =>{
                return total + parseFloat(client.balance.toString());
            },0);

            return {totalOwed: total}
            }
            //if there are no clients:
            return null;
                
    }

  render() {
     const {clients} = this.props; //we use destructuring
     /*
     const clients =  
      [{
          id:'1',
          firstName:'ori',
          lastName:'souch',
          email:'asdf@gmail.com',
          phone:'2132435453',
          balance:'23.34'
      },
      {
        id:'2',
        firstName:'asdf',
        lastName:'souch',
        email:'asdf@gmail.com',
        phone:'2132435453',
        balance:'-34'
    },
    ]
    */
     
    const {totalOwed} = this.state;

      if(clients){
          return(
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <h2>
                            {' '} {/* '' is used for spacing is jsx */}
                            <i className="fas fa-users"></i> My Clients{' '}
                        </h2>
                    </div>

                    <div className="col-md-6">
                    <h5 className="text-right text-secondary">Total balance:{' '}
                    <span className="text-primary">
                    {parseFloat(totalOwed).toFixed(2)}$
                    </span>
                     </h5>
                    </div>

                </div>

                <table className="table table-striped" >
                    <thead className="thead-inverse" /*will make table dark */>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance </th>
                            <th /> {/*will be a button*/}
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => ( /* for each client we map we will return a row with this data: */
                            <tr key={client.id}>
                            <td>{client.firstName} {client.lastName}</td>
                            <td>{client.email}</td>
                            <td><span className={classnames({
                                     'text-danger': client.balance < 0,
                                     'text-success': client.balance === 0,
                                     'text-warning': client.balance > 0

                                 })}>
                                 {parseFloat(client.balance).toFixed(2) } $ 
                                 </span>
                            </td>
                            
                            <td>
                                <Link to={`/clients/${client.id}`} className="btn btn-info btn-sm">
                                 <i className="fas fa-info"></i>
                                </Link>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                
            </div>
          );
      }else{
          return(
           <Spinner/>
          )
      };
    
  }
}
//varification
Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}




export default compose(
    firestoreConnect([
        { collection:'clients'} // { path: 'name of collection in firebase' } // object notation
    ]),
    connect((state, props) => ({
      clients: state.firestore.ordered.clients
      // enabls access by this.props.clients!!!
    }))
  )(Clients);
    //the name of our component
   
  
  