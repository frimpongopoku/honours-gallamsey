import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GButton from './components/button/Button';
import {colors} from './styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoadingSpinner from './components/spinner/LoadingSpinner';
import {CREATE_NEW_PROFILE, LOADING} from './pages/authentication/constants';

const Splash = ({navigation, fireUser, user}) => {
  useEffect(() => {
    if (user === CREATE_NEW_PROFILE)
      return navigation.navigate('CompleteProfile');
  }, [user]);
  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 55, color: 'white', fontWeight: '700'}}>
          Gallamsey
        </Text>
        {fireUser === LOADING && (
          <LoadingSpinner color="white" size={35} text="Authenticating..." />
        )}
        {/* <ActivityIndicator size={30} color="white" />
        <Text style={{color: 'white'}}>Loading something ...</Text> */}
        {!fireUser && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              marginTop: 30,
            }}>
            <GButton
              variant="green"
              onPress={() => navigation.navigate('Home')}
              style={{marginRight: 10}}>
              TEST HOME
            </GButton>
            <GButton
              variant="black"
              onPress={() => navigation.navigate('Login')}>
              TEST AUTH
            </GButton>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({fireAuth: state.fireAuth, user: state.user});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
