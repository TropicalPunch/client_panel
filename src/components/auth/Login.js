import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect} from 'react-redux-firebase'

import {notifyUser} from '../../actions/notifyActions.js';
import Alert from '../layout/Alert.js';



class Login extends Component {
    state={
        email: '',
        password: ''
    }

    onSubmit= e=>{
        e.preventDefault();

        const{ firebase }= this.props;
        const {email,password} = this.state;
        firebase.login({
            email,
            password
        }).catch(err => this.props.notifyUser('invalid email or password','error'))
    } 
    onChange= e => {
        this.setState( {[e.target.name]: e.target.value})
    }

  render() {
      //thanks to export line
      const {message,messageType} = this.props.notify;
    return (
      <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card" >
            <div className="card-body"> 
               
                <h1 className="text-center pb-4 pt-3">
                    <span className="text-primary">
                    <i className="fas fa-user-lock" ></i>
                    {' '} Login
                    </span>
                </h1>
            
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <lable htmlFor="email">
                            Email
                        </lable>

                        <input  type="text" className="form-control" name="email" required value={this.state.email} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <lable htmlFor="password">
                         Password
                        </lable>

                        <input  type="password" className="form-control" name="password" required value={this.state.password} onChange={this.onChange}/>
                    </div>
                    
                    {message ? (
                    <Alert message={message} messageType={messageType} />

                ): null

                }
                    <input  type="submit" className="btn-primary btn-block"  value="Login" />

                </form>
            </div >
        </div>
      </div>
        
      </div>
    )
  }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default 
compose(
    firebaseConnect(),
    connect((state,props)=> ({
        notify: state.notify
    }),
    {notifyUser}
    )
)(Login) ;