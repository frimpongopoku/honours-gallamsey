import {View, Text, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import Toolbar from '../../../components/toolbar/Toolbar';
import PageTitle from '../../../components/intros/PageTitle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import TextBox from '../../../components/textbox/TextBox';
import GButton from '../../../components/button/Button';

const RegistrationScreen = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Toolbar
        title="Registration Page"
        onBackPress={() =>
          console.log('Tyring to go back from registration page')
        }
      />
      <ScrollView>
        <View>
          <PageTitle
            title="Create your account"
            subtext="Start earning by lending a helping hand"
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <TextBox label="Email" placeholder="Enter your email..." />
          <TextBox
            label="Password"
            placeholder="Enter your password..."
            generics={{secureTextEntry: true}}
          />
          <TextBox
            label="Confirm Password"
            placeholder="Enter confirmation password..."
            generics={{secureTextEntry: true}}
          />
          <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
            <GButton variant="green">SIGN ME UP! </GButton>
          </View>
          <View style={{paddingVertical: 60}}></View>
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <GButton> SIGN UP WITH GOOGLE </GButton>
        <GButton variant="black"> LOGIN INSTEAD </GButton>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
