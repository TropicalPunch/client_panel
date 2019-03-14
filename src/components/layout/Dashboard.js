//Dashboard componenet is the father (function) component of sidebar and client components! 
import React from 'react';
import Clients from '../clients/Clients.js';
import Sidebar from './Sidebar.js';

export default () => {
  return (
    <div className="row" >
     <div className="col-md-10">
        <Clients/>
     </div>
     <div className="col-md-2">
        <Sidebar/>
     </div>
    </div>
  )
}
