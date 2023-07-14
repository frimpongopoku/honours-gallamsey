import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageTitle from '../../components/intros/PageTitle';
import PersonalInformation from './PersonalInformation';
import Toolbar from '../../components/toolbar/Toolbar';
import GButton from '../../components/button/Button';
import Identification from './Identification';
import ChangeProfilePhoto from './ChangeProfilePhoto';
import {useNavigation} from '@react-navigation/native';

const CreateProfile = () => {
  const [page, setPage] = useState('personal');
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  console.log('LE FORM HERE', form);

  const _continue = currentTab => {
    if (page === 'photo') return navigation.navigate('Home');
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

  const props = {onChange: handleInput, getError, form};
  const tabs = {
    personal: {
      component: <PersonalInformation {...props} />,
      next: 'identification',
      btnText: 'CONTINUE 1/3 ',
    },
    identification: {
      component: <Identification {...props} />,
      next: 'photo',
      btnText: 'CONTINUE 2/3 ',
    },
    photo: {
      component: <ChangeProfilePhoto {...props} />,
      btnText: 'FINISH 3/3 ',
    },
  };
  const currentTab = tabs[page];
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

export default CreateProfile;
