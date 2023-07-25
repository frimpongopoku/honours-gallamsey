import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
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
import SettingsScreen from './app/pages/settings/SettingsScreen';
import {Text} from 'react-native';
import GModal from './app/components/modal/Modal';
import AsDialogBox from './app/components/modal/AsDialogBox';
import {bindActionCreators} from 'redux';
import {
  fetchNewsFeed,
  findUserProfile,
  loadFirebaseUserAction,
  setGallamseyUser,
  toggleUniversalModal,
} from './app/redux/actions/actions';
import {connect} from 'react-redux';
import {checkUserAuthenticationStatus} from './app/firebase/utils';
import {CREATE_NEW_PROFILE} from './app/pages/authentication/constants';
import Chatting from './app/pages/chat/Chatting';

const Stack = createStackNavigator();

const Router = ({
  modalOptions,
  toggleModal,
  fireAuth,
  setFirebaseUser,
  fetchProfile,
  user,
  fetchNews,
  setUserProfile,
}) => {
  useEffect(() => {
    checkUserAuthenticationStatus(fireUser => {
      setFirebaseUser(fireUser);
      if (fireUser) fetchProfile(fireUser?.email);
      else {
        fetchNews();
        setUserProfile(null);
      }
    });
  }, [fireAuth]);

  // console.log('USER PROFILE IN ROUTER:  ', user);

  return (
    <NavigationContainer>
      <GModal
        close={() => toggleModal({...(modalOptions || {}), show: false})}
        {...(modalOptions || {})}>
        {modalOptions?.component}
      </GModal>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Chatting"
          options={{headerShown: false}}
          component={Chatting}
        />
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
        <Stack.Screen
          name="Settings"
          options={{headerShown: false}}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    modalOptions: state.modal,
    fireAuth: state.fireAuth,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleModal: toggleUniversalModal,
      setFirebaseUser: loadFirebaseUserAction,
      fetchProfile: findUserProfile,
      fetchNews: fetchNewsFeed,
      setUserProfile: setGallamseyUser,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Router);
