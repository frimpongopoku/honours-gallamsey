import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GButton from './components/button/Button';

const Splash = ({navigation}) => {
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
        <GButton
          variant="green"
          onPress={() => navigation.navigate('Home')}
          style={{marginBottom: 10}}>
          {' '}
          TEST HOME PAGE
        </GButton>
        <GButton variant="black" onPress={() => navigation.navigate('Login')}>
          {' '}
          TEST AUTHENTICATION
        </GButton>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
