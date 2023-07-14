import {View, Text} from 'react-native';
import React from 'react';
import PageTitle from '../../components/intros/PageTitle';
import Notification from './Notification';
import {ScrollView} from 'react-native-gesture-handler';

const NotificationScreen = () => {
  return (
    <View>
      <PageTitle
        v2
        title="Notifications"
        subtext="Manage your notifications here"
      />

      <ScrollView
        style={{paddingVertical: 20, height: '100%', backgroundColor: 'white'}}>
        <Notification complete subtext="COMPLETE (GHS 175)" />
        {[3, 2, 2].map((_, index) => (
          <View key={index?.toString()}>
            <Notification />
          </View>
        ))}
        {/* <Notification /> */}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
