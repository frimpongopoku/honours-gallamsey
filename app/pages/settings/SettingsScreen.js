import {View, Text, SafeAreaView, Switch} from 'react-native';
import React from 'react';
import PageTitle from '../../components/intros/PageTitle';
import Toolbar from '../../components/toolbar/Toolbar';
import GSwitch from '../../components/switch/GSwitch';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <Toolbar title="Settings" />
      <PageTitle
        v2
        title="Manage your settings"
        subtext="All your setting & personalisations will be available on this page"
      />

      <View style={{paddingHorizontal: 20}}>
        <GSwitch label="Prioritise errands close to me" />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
