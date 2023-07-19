import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../styles';
import TextBox from '../../../components/textbox/TextBox';
import GButton from '../../../components/button/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {errorStyles} from '../../../utils';
import {
  firebaseLoginWithEmailAndPassword,
  useEmailAndPassword,
} from '../../../firebase/utils';
import {bindActionCreators} from 'redux';
import {loadFirebaseUserAction} from '../../../redux/actions/actions';
import {connect} from 'react-redux';

const LoginScreen = ({navigation, setFireUser}) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = changeObject => {
    setForm({...form, ...changeObject});
  };

  const login = () => {
    setErrors({});
    if (!form.email) return (errors.email = 'Please enter a valid email');
    if (!form.password)
      return (errors.password = 'Please enter a valid password');
    firebaseLoginWithEmailAndPassword(
      form.email.trim(),
      form.password.trim(),
      (response, error) => {
        if (error) return Alert.alert(error);
        setFireUser(response.user);
        console.log('AFTER LOGIN RESPONSE', response);
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      // behavior={'height'}
      enabled>
      <ScrollView>
        <View style={{width: '100%', marginVertical: 50}}></View>
        <Text style={styles.bigText}>Gallamsey</Text>
        <Text style={styles.subtext}>Help is on the way!</Text>
        <View style={{marginTop: 30, paddingHorizontal: 30}}>
          <TextBox
            labelStyle={errors.email && errorStyles.labelStyle}
            style={errors.email && errorStyles.inputStyle}
            name="email"
            onChange={handleInput}
            label={errors.email || 'Email'}
            value={form.email}
            placeholder="Enter your email..."
          />
          <TextBox
            labelStyle={errors.password && errorStyles.labelStyle}
            style={errors.password && errorStyles.inputStyle}
            value={form.password}
            name="password"
            onChange={handleInput}
            label={errors.password || 'Password'}
            placeholder="Enter your password..."
            generics={{secureTextEntry: true}}
          />
          {/* <GButton likeLink style={styles.forgotten}>
            I have forgotten my password
          </GButton> */}
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <GButton onPress={login} style={{}} variant="black">
              LOGIN
            </GButton>
          </View>
        </View>
        <View style={{marginBottom: 30}}></View>
      </ScrollView>

      <View style={{marginTop: 'auto', width: '100%'}}>
        <GButton variant="red">LOGIN WITH GOOGLE</GButton>
        <GButton
          variant="green"
          onPress={() => navigation.navigate('Register')}>
          JOIN US!
        </GButton>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  forgotten: {
    color: colors.red,
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 18,
  },
  bigText: {
    fontSize: 50,
    textAlign: 'center',
    color: colors.red,
    fontWeight: '800',
  },
  subtext: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({setFireUser: loadFirebaseUserAction}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
