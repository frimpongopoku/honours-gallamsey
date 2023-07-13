import auth from '@react-native-firebase/auth';
import {FIREBASE_APP} from './config';

export const signoutOfFirebase = cb => {
  auth()
    .signOut()
    .then(() => {
      cb && cb(true);
    })
    .catch(e => console.log('Could not sign out', e.toString()));
};
export const checkUserAuthenticationStatus = cb => {
  auth().onAuthStateChanged(user => cb && cb(user));
};
export const useEmailAndPassword = (email, password, cb) => {
  console.log('lets see the values', email, password);

  auth()
    .createUserWithEmailAndPassword(email?.trim(), password.trim())
    .then(userCredential => {
      cb && cb(userCredential);
    })
    .catch(error => {
      cb && cb(null, error.toString());
      console.log(error.toString());
    });
};
