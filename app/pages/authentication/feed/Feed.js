import {View, Text, RefreshControl, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ErrandFeedItem from './ErrandFeedItem';
// import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNewsFeed} from '../../../redux/actions/actions';

const Feed = ({news, fetchNews, user}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    fetchNews(user, () => {
      console.log('Finished refreshing');
      setRefreshing(false);
    });
    // fetchData();
    // setIsRefreshing(false);
  };

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {news?.map((errand, index) => (
          <View key={index?.toString()}>
            <ErrandFeedItem errand={errand} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNews: fetchNewsFeed,
    },
    dispatch,
  );
const mapStateToProps = state => {
  return {
    preferences: state.userPreferences,
    news: state.news,
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Feed);
