import {View, Text, SafeAreaView, Switch} from 'react-native';
import React from 'react';
import PageTitle from '../../components/intros/PageTitle';
import Toolbar from '../../components/toolbar/Toolbar';
import GSwitch from '../../components/switch/GSwitch';
import {bindActionCreators} from 'redux';
import {setUserPreferencesAction} from '../../redux/actions/actions';
import {connect} from 'react-redux';

const SettingsScreen = ({setPreferencesInRedux, preferences}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <Toolbar title="Settings" />
      <PageTitle
        v2
        title="Manage your settings"
        subtext="All your setting & personalisations will be available on this page"
      />

      <View style={{paddingHorizontal: 20}}>
        <GSwitch
          value={preferences?.closeToMe}
          onChange={value =>
            setPreferencesInRedux({...preferences, closeToMe: value})
          }
          label="Prioritise errands close to me"
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {preferences: state.userPreferences};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {setPreferencesInRedux: setUserPreferencesAction},
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
