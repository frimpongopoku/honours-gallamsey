import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './app/pages/home/HomeScreen';
import LoginScreen from './app/pages/authentication/login/LoginScreen';
import RegistrationScreen from './app/pages/authentication/registration/RegistrationScreen';
import Splash from './app/Splash';
import CreateProfile from './app/pages/profile/CreateProfile';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CompleteProfile">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
