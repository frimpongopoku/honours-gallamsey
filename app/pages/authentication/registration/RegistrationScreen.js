import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import Toolbar from '../../../components/toolbar/Toolbar';
import PageTitle from '../../../components/intros/PageTitle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import TextBox from '../../../components/textbox/TextBox';
import GButton from '../../../components/button/Button';
import {errorStyles} from '../../../utils';

const RegistrationScreen = ({navigation}) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleInput = changeObject => {
    setForm({...form, ...changeObject});
  };
  const getError = name => {
    const {labelStyle, inputStyle} = errorStyles;
    const message = errors[name];
    if (!message) return {};
    return {message, labelStyle, inputStyle};
  };

  const emailError = getError('email');
  const passError = getError('password');
  const confirmError = getError('confirmPassword');

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: 'white'}}>
      <Toolbar
        title="Registration Page"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View>
          <PageTitle
            title="Create your account"
            subtext="Start earning by lending a helping hand"
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <TextBox
            labelStyle={emailError.labelStyle}
            style={emailError.inputStyle}
            value={form?.email}
            onChange={handleInput}
            name="email"
            label={emailError.message || 'Email'}
            placeholder="Enter your email..."
          />
          <TextBox
            labelStyle={passError.labelStyle}
            style={passError.inputStyle}
            value={form?.password}
            onChange={handleInput}
            name="password"
            label="Password"
            placeholder={passError.message || 'Enter your password...'}
            generics={{secureTextEntry: true}}
          />
          <TextBox
            labelStyle={confirmError.labelStyle}
            style={confirmError.inputStyle}
            value={form?.confirmPassword}
            onChange={handleInput}
            name="confirmPassword"
            label={confirmError.message || 'Confirm Password'}
            placeholder="Enter confirmation password..."
            generics={{secureTextEntry: true}}
          />
          <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
            <GButton
              variant="green"
              onPress={() => navigation.navigate('CompleteProfile')}>
              SIGN ME UP!{' '}
            </GButton>
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
