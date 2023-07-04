import {View, Text} from 'react-native';
import React from 'react';
import ErrandFeedItem from './ErrandFeedItem';
import {ScrollView} from 'react-native-gesture-handler';

const Feed = () => {
  return (
    <View>
      <ScrollView>
        <ErrandFeedItem />
        <ErrandFeedItem />
        <ErrandFeedItem />
      </ScrollView>
    </View>
  );
};

export default Feed;
