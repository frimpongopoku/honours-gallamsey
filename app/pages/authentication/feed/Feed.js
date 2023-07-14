import {View, Text} from 'react-native';
import React from 'react';
import ErrandFeedItem from './ErrandFeedItem';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

const Feed = ({preferences}) => {
  console.log('Here are hte preferences', preferences);
  return (
    <View>
      <ScrollView>
        {[23, 4, 4].map((item, index) => (
          <View key={index?.toString()}>
            <ErrandFeedItem showDistanceInformation={preferences?.closeToMe} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {preferences: state.userPreferences};
};
export default connect(mapStateToProps)(Feed);
