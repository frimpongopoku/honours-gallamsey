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

const Root = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <App />
      </GestureHandlerRootView>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
