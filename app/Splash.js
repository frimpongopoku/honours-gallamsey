import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GButton from './components/button/Button';
import {colors} from './styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoadingSpinner from './components/spinner/LoadingSpinner';
import {CREATE_NEW_PROFILE, LOADING} from './pages/authentication/constants';
import {isEmulator} from './utils';
import ImagePro from './components/image/ImagePro';

const Splash = ({navigation, fireAuth, user}) => {
  useEffect(() => {
    if (user === CREATE_NEW_PROFILE)
      return navigation.navigate('CompleteProfile');
  }, [user]);

  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          backgroundColor: isEmulator() ? 'blue' : 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 55, color: 'white', fontWeight: '700'}}>
          Gallamsey
        </Text>
        {fireAuth === LOADING && (
          <LoadingSpinner color="white" size={35} text="Authenticating..." />
        )}
        {/* <ActivityIndicator size={30} color="white" />
        <Text style={{color: 'white'}}>Loading something ...</Text> */}
        {!fireAuth && (
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

        {user && (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}>
            {user?.image && (
              <ImagePro
                imageUrl={user?.image}
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 1000,
                  borderWidth: 3,
                  borderColor: 'white',
                }}
              />
            )}

            <Text
              style={{
                marginVertical: 20,
                fontSize: 22,
                fontWeight: '900',
                color: 'white',
              }}>
              Welcome back, {user?.preferredName}!
            </Text>

            <GButton
              onPress={() => navigation.navigate('Home')}
              style={{borderRadius: 55}}
              variant="black">
              CONTINUE
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
