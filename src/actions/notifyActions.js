
import {NOTIFY_USER} from './types.js';

export const notifyUser = (message,messageType) => {
  return{ 
    type: NOTIFY_USER,
    message,
    messageType
  }
};








