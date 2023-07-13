import auth from '@react-native-firebase/auth';
import {FIREBASE_APP} from './config';

export const checkUserAuthenticationStatus = cb => {
  auth().onAuthStateChanged(user => cb && cb(user));
};
export const useEmailAndPassword = (email, password, cb) => {
  console.log('lets see the values', email, password);

  auth()
    .createUserWithEmailAndPassword(email?.trim(), password.trim())
    .then(userCredential => {
      cb && cb(userCredential);
      // console.log('Logged in successfully!', userCredential.user);
    })
    .catch(error => {
      cb && cb(null, error.toString());
      console.log(error.toString());
    });
};

// export const useEmailAndPassword = (email, password, cb) => {
//   signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
//     .then(userCredential => {
//       cb && cb(userCredential);
//       // console.log('Logged in successfully!', userCredential.user);
//     })
//     .catch(error => {
//       cb && cb(null, error.toString());
//     });
// };
