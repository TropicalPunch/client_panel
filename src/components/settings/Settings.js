import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setAllowRegistration,
setDisableBalanceOnAdd,
setDisableBalanceOnEdit} from '../../actions/settingsActions.js';

class Settings extends Component {
 
    disableBalanceOnAddChange= () => {
        const {setDisableBalanceOnAdd} = this.props;
        setDisableBalanceOnAdd();
    }

    disableBalanceOnEditChange= () => {
        const {setDisableBalanceOnEdit} = this.props;
        setDisableBalanceOnEdit();
    }

    allowRegistrationChange= () => {
        const {setAllowRegistration} = this.props;
        setAllowRegistration();
    }

  render() {
    const {disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration}= this.props.settings;


    return (
      <div>
       <div className="row">
        <div className="col-md-6">
            <Link to="/" className="btn btn-link" >
             <i className="fas fa-arrow-circle-left"></i>
             {' '} Back To Clients
            </Link>

        </div>
       </div>
       <div className="card">
        <div className="card-header">
            <h1>ClientPanel Settings</h1>
        </div>
        <div className="card-body">
     {/*lest make the checkboxpanal rof the settings page: */}
         <form>

             <div className="from-group">
             <label>Allow Registration</label>{' '}
             <input type="checkbox" name="allowRegistration" checked={!!allowRegistration} onChange={this.allowRegistrationChange} />
             {/**checked={!!allowRegistration} => if allowRegistration is set as true it will be checked!!!! */}
             </div>

             <div className="from-group">
             <label>Disable Balance On Add</label>{' '}
             <input type="checkbox" name="disableBalanceOnAdd" checked={!!disableBalanceOnAdd} onChange={this.disableBalanceOnAddChange} />
             </div>

             <div className="from-group">
             <label>Disable Balance On Edit</label>{' '}
             <input type="checkbox" name="disableBalanceOnEdit" checked={!!disableBalanceOnEdit} onChange={this.disableBalanceOnEditChange} />
             </div>


         </form>

        </div>

       </div>
      </div>
    )
  }
}

Settings.propTypes ={
    settings: PropTypes.object.isRequired,
    setAllowRegistration:PropTypes.func.isRequired,
    setDisableBalanceOnAdd:PropTypes.func.isRequired,
    setDisableBalanceOnEdit:PropTypes.func.isRequired
}

export default connect((state,props) =>({
auth: state.firebase.auth,
settings: state.settings //takes from redux state ({disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration}) and allows us to access by=> this.props.settings!!!
}), {setAllowRegistration,setDisableBalanceOnAdd,setDisableBalanceOnEdit} //all oure actions
) (Settings);