import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GButton from './components/button/Button';
import {colors} from './styles';

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
        <Text style={{fontSize: 55, color: 'white', fontWeight: '700'}}>
          Gallamsey
        </Text>
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
          <GButton variant="black" onPress={() => navigation.navigate('Login')}>
            TEST AUTH
          </GButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
