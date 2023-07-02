/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './app/AppStart';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Root = () => {
  return (
    <GestureHandlerRootView>
      <App />
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => Root);
