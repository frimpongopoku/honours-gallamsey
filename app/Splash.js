import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import GButton from './components/button/Button';

const Splash = () => {
  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: 'red'}}>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <Text>This is the splash screeen</Text>
        <GButton>Wait what is this</GButton>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
