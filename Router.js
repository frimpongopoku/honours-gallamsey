import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './app/pages/home/HomeScreen';
import LoginScreen from './app/pages/authentication/login/LoginScreen';
import RegistrationScreen from './app/pages/authentication/registration/RegistrationScreen';
import Splash from './app/Splash';
import CreateProfile from './app/pages/profile/CreateProfile';
import ChangeProfilePhoto from './app/pages/profile/ChangeProfilePhoto';
import CreateErrandScreen from './app/pages/create errand/CreateErrandScreen';
import ViewErrandScreen from './app/pages/view errands/ViewErrandScreen';
import ViewErrandMedia from './app/pages/view errands/ViewErrandMedia';
import ViewProfileScreen from './app/pages/profile/view/ViewProfileScreen';
import ManageLocations from './app/pages/profile/view/ManageLocations';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="CompleteProfile"
          options={{headerShown: false}}
          component={CreateProfile}
        />
        <Stack.Screen
          name="ChangeProfilePhoto"
          options={{headerShown: false}}
          component={ChangeProfilePhoto}
        />
        <Stack.Screen
          name="CreateErrand"
          options={{headerShown: false}}
          component={CreateErrandScreen}
        />
        <Stack.Screen
          name="ViewErrand"
          options={{headerShown: false}}
          component={ViewErrandScreen}
        />
        <Stack.Screen
          name="ViewErrandMedia"
          options={{headerShown: false}}
          component={ViewErrandMedia}
        />
        <Stack.Screen
          name="ViewProfile"
          options={{headerShown: false}}
          component={ViewProfileScreen}
        />
        <Stack.Screen
          name="Locations"
          options={{headerShown: false}}
          component={ManageLocations}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
