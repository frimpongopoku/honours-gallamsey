import {View, Text, BackHandler, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageTitle from '../../components/intros/PageTitle';
import PersonalInformation from './PersonalInformation';
import Toolbar from '../../components/toolbar/Toolbar';
import GButton from '../../components/button/Button';
import Identification from './Identification';
import ChangeProfilePhoto from './ChangeProfilePhoto';
import {useNavigation} from '@react-navigation/native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setGallamseyUser} from '../../redux/actions/actions';
import {CREATE_NEW_PROFILE} from '../authentication/constants';
import {apiCall} from '../../api/messenger';
import {CREATE_NEW_PROFILE_URL} from '../../api/urls';

const CreateProfile = ({user, fireAuth, putUserInRedux}) => {
  const [page, setPage] = useState('personal');
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  console.log('This is the current user we are facing now', user, fireAuth);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [page]);

  const submitUpdates = form => {};

  const submitForm = form => {
    setErrors({});
    const isEditing = user !== CREATE_NEW_PROFILE;
    if (isEditing) return submitUpdates(form);
    const {preferredName, lastName, firstName} = form;
    if (!preferredName)
      return (errors.preferredName = 'Please enter a valid preferred name');
    if (!lastName) return (errors.lastName = 'Please enter a valid last name');
    if (!firstName)
      return (errors.firstName = 'Please enter a valid first name');

    apiCall(
      CREATE_NEW_PROFILE_URL,
      {body: {...form, email: fireAuth?.email}},
      response => {
        if (!response?.success) return Alert.alert(response.error);
        putUserInRedux(response?.data);
        navigation.navigate('Home');
      },
    );
  };

  const _continue = currentTab => {
    if (page === 'photo') return submitForm(form);
    setPage(currentTab.next);
  };

  const handleInput = changeObject => {
    setForm({...form, ...changeObject});
  };
  const getError = name => {
    const {labelStyle, inputStyle} = errorStyles;
    const message = errors[name];
    if (!message) return {};
    return {message, labelStyle, inputStyle};
  };

  const props = {onChange: handleInput, getError, errors, form, submitForm};
  const tabs = {
    personal: {
      component: <PersonalInformation {...props} />,
      next: 'identification',
      btnText: 'CONTINUE 1/3 ',
    },
    identification: {
      component: <Identification {...props} />,
      next: 'photo',
      prev: 'personal',
      btnText: 'CONTINUE 2/3 ',
    },
    photo: {
      component: <ChangeProfilePhoto {...props} />,
      prev: 'identification',
      btnText: 'FINISH 3/3 ',
    },
  };
  const currentTab = tabs[page];

  const handleBackPress = () => {
    if (currentTab?.prev) setPage(currentTab.prev);
    return true;
  };
  return (
    <SafeAreaView>
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <Toolbar title="Complete Your Profile" />
        <View>{currentTab.component}</View>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <GButton variant="green" onPress={() => _continue(currentTab)}>
            {currentTab.btnText}
          </GButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    fireAuth: state.fireAuth,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      putUserInRedux: setGallamseyUser,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
