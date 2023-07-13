/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './app/AppStart';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import Router from './Router';

import {firebaseConfig} from './app/firebase/config';
const Root = () => {
  return (
    // <FirebaseAppProvider config={firebaseConfig}>
    //   <FirebaseAuthProvider>
    
        <Provider store={store}>
          <Router />
        </Provider>
    //   </FirebaseAuthProvider>
    // </FirebaseAppProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
