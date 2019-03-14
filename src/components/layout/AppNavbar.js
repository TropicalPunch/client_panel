import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect} from 'react-redux-firebase'



 class AppNavbar extends Component {
     state={
         isAuthenticated: false
     }

     //we wamt to check the auth object (also in export) which  coming from the state
     // getDerivedStateFromProps => we will use whenever we want to get somthing from the redux state and manipulate it!!!
     static getDerivedStateFromProps(props, state){
         const {auth} = props;
         if(auth.uid){
             return{
                 isAuthenticated:true
             }
         }else{
             return{
                isAuthenticated:false
             }
         }
     }
//lets create log out function
     onLogoutClick = (e) => {
        e.preventDefault();

        const {firebase} = this.props;
        //this is firebase logout commande...
        firebase.logout();
     }

  render() {
      const {isAuthenticated} = this.state;
      const {auth} = this.props;

    return (
    <nav className="navbar navbar-expand-md navbar-dark bg-info mb-4">
     <div className="container">
        <Link to="/" className="navbar-brand">
            ClientPanel
        </Link>
        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarMain" >
    {/*will give the hamburger collapse icon: (in span) */}
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
            <ul className=" navbar-nav mr-auto">
               
                {/**will show the dashboard only if user is logged */}
                {isAuthenticated ?(  
                     <li className="nav-item">
                       <Link to="/" className="nav-link">
                          Dashboard
                        </Link>
                    
                     </li>
                    ) : null
                }
              

            </ul>
            {/**will show the user  email in dashboard only if user is logged */}
            {isAuthenticated ?(  
                   <ul className="navbar-nav ml-auto">
                    
                     <li className="nav-item">
                     <a href="#!" className=" nav-link"  > {auth.email} </a>
                     </li>

                     <li className="nav-item">
                     <a href="#!" className=" nav-link" onClick={this.onLogoutClick} > Logout </a>
                     </li>

                   </ul>
                
                ) : null}

                <ul  className="navbar-nav ml-auto">
                  {/**will show the dashboard only if user is logged */}
                  {isAuthenticated ?(  
                     <li className="nav-item">
                       <Link to="/settings" className="nav-link">
                          Settings
                        </Link>
                    
                     </li>
                    ) : null
                  }
              

                 </ul>




        </div>
    </div>
    </nav>
    )
  }
}
AppNavbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth:  PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state,props)=>({
        auth: state.firebase.auth,
        settings: state.settings
    }))
    )(AppNavbar);





