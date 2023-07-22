import {View, Text, SafeAreaView, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/intros/PageTitle';
import Toolbar from '../../components/toolbar/Toolbar';
import GSwitch from '../../components/switch/GSwitch';
import {bindActionCreators} from 'redux';
import {
  setGallamseyUser,
  setUserPreferencesAction,
} from '../../redux/actions/actions';
import {connect} from 'react-redux';
import {apiCall} from '../../api/messenger';
import {UPDATE_USER_URL} from '../../api/urls';
import TextBox from '../../components/textbox/TextBox';
import GButton from '../../components/button/Button';

const SettingsScreen = ({putUserInRedux, user}) => {
  const [kms, setKms] = useState(null);
  const [loading, setLoading] = useState(false);
  const preferences = user?.preferences || {};

  useEffect(() => {
    setKms(user?.preferences?.proximityRadius || '10');
  }, [user]);
  const sendUpdatesToBackend = value => {
    const newPref = {...preferences, ...(value || {})};
    putUserInRedux({...user, preferences: newPref}); // update locally
    setLoading(true);
    apiCall(
      UPDATE_USER_URL,
      {body: {preferences: newPref, id: user?._id}},
      response => {
        setLoading(false);
        if (response.success) {
          putUserInRedux(response.data);
        }

        console.log('RESPONSE IN SETTINGS: ', response);
      },
    );
  };
  console.log('This is proximity', kms);
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
          onChange={value => sendUpdatesToBackend({closeToMe: value})}
          label="Prioritise errands close to me"
        />
        {preferences?.closeToMe && (
          <View>
            <TextBox
              name="proximityRadius"
              onChange={obj => setKms(obj['proximityRadius'])}
              placeholder="Enter proximity radius in Kms..."
              containerStyle={{padding: 0, marginVertical: 20}}
              value={kms}
              generics={{keyboardType: 'numeric'}}
              label="How close should errands be to you? (in Kilometers)">
              <Text style={{color: 'black', fontSize: 12, marginVertical: 5}}>
                The default is 10 kilometers. So you will see errands that are
                within 10km from the location you have set as primary
              </Text>
            </TextBox>
            <GButton
              loading={loading}
              disabled={loading}
              onPress={() =>
                kms && sendUpdatesToBackend({proximityRadius: kms})
              }
              variant="green">
              {' '}
              Save
            </GButton>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {preferences: state.userPreferences, user: state.user};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setPreferencesInRedux: setUserPreferencesAction,
      putUserInRedux: setGallamseyUser,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
