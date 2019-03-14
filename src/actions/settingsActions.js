import {DISABLE_BALANCE_ON_ADD,  DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION } from './types.js';




export const setDisableBalanceOnAdd = () => {
//get settings from local storage(the initial object)
const settings = JSON.parse(localStorage.getItem('settings'));

//toggle it's value:
settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

//set back to localstorage
localStorage.setItem('settings', JSON.stringify(settings));

    return{

        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd

    };

 };

export const setDisableBalanceOnEdit = () => {
 
const settings = JSON.parse(localStorage.getItem('settings'));


settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;


localStorage.setItem('settings', JSON.stringify(settings));

    return{
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    };
    
};

export const setAllowRegistration = () => {
 
const settings = JSON.parse(localStorage.getItem('settings'));


settings.allowRegistration = !settings.allowRegistration;


localStorage.setItem('settings',JSON.stringify(settings));

     return{
      type: ALLOW_REGISTRATION,
      payload: settings.allowRegistration
    };
        
 };