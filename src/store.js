//follow github : https://github.com/prescottprue/react-redux-firebase  ==>@USE

import { createStore, combineReducers, compose } from 'redux';
import 'firebase/firestore' // <- needed if using firestore;
import firebase, { storage } from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';// <- needed if using firestore

import notifyReducer from './reducers/notifyReducer.js';
import settingsReducer from './reducers/settingsReducer.js';


const firebaseConfig = {
    apiKey: "AIzaSyAAlusqkLh4yDGUdyYK5E5HUXxjcfcdQ0Q",
    authDomain: "reactclientpanel-59acd.firebaseapp.com",
    databaseURL: "https://reactclientpanel-59acd.firebaseio.com",
    projectId: "reactclientpanel-59acd",
    storageBucket: "reactclientpanel-59acd.appspot.com",
    messagingSenderId: "170539397359"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
     useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  // Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize other services on firebase instance

const firestore = firebase.firestore(); // <- needed if using firestore

const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore);
  
  // Add firebase to reducers
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify:notifyReducer,
    settings: settingsReducer
  });
////////////////////////////////////////////////////////////////////////////////////////////
  //LOCAL STORAGE!!!:
  //CHECK FOR SETTINGS IN LOCAL STORAGE:
  if (localStorage.getItem('settings') == null ){
    //set for default settings:
    const defaultSettings = {
      disableBalanceOnAdd:true,
      disableBalanceOnEdit:false,
      allowRegistration:false
    }
    //set default settings to local storage
    //we can only put strings into local storage (initial state in an object) therefore we use  JSON.stringify
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
  }

// Create store with reducers and initial state
//we set settings to whatever it equals in local storage
//==> JSON.parse==> we use it to make the settings as object again...from string
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };
/////////////////////////////////////////////////////////////////////////////////////////////


const store = createStoreWithFirebase(rootReducer, initialState,
    compose(reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 
    ))

export default store;










