import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageTitle from '../../components/intros/PageTitle';
import PersonalInformation from './PersonalInformation';
import Toolbar from '../../components/toolbar/Toolbar';
import GButton from '../../components/button/Button';
import Identification from './Identification';

const CreateProfile = () => {
  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        <Toolbar title="Complete Your Profile" />
        <View>
          {/* <PersonalInformation /> */}
          <Identification />
        </View>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <GButton variant="green">CONTINUE (1/3)</GButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateProfile;
