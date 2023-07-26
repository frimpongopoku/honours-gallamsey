import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PageTitle from '../../components/intros/PageTitle';
import {SmallErrandItem} from './RunningErrands';
import {STAGES} from '../view errands/ErrandStateTracker';
import ImagePro from '../../components/image/ImagePro';
import {colors} from '../../styles';
import {connect} from 'react-redux';
import {LOADING} from '../authentication/constants';
import {useNavigation} from '@react-navigation/native';
import {bindActionCreators} from 'redux';
import {fetchMyPosts} from '../../redux/actions/actions';
import {getTimeAgo} from '../../utils';

const YourErrandPosts = ({myErrands, user, fetchPosts}) => {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {}, [myErrands]);

  const handleRefresh = () => {
    setRefreshing(true);

    fetchPosts(user, () => {
      // console.log('Finished refreshing my errand POSTS!', response);
      setRefreshing(false);
    });
  };
  if (myErrands === LOADING) return <ActivityIndicator color="red" size={40} />;
  const navigation = useNavigation();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <PageTitle
        v2
        title="Your Posts"
        subtext="Here are the errands you have posted"
      />

      <View style={{}}>
        {myErrands?.map((errand, index) => (
          <View key={index?.toString()}>
            <MyPostErrandItem
              {...errand}
              onPress={() => navigation.navigate('ViewErrand', {data: errand})}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  myErrands: state.yourPosts,
  user: state.user,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPosts: fetchMyPosts,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(YourErrandPosts);
export const MyPostErrandItem = ({
  cost,
  images,
  reward,
  title,
  status,
  createdAt,
  runner,
  onPress,
}) => {
  const image = (images || [])[0];
  const stage = STAGES.find(item => item.key === status);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,

        backgroundColor: '#FBFBFB',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
      }}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <ImagePro
          style={{
            width: 50,
            height: 50,
            borderRadius: 55,
            borderWidth: 2,
            borderColor: colors.red,
            marginRight: 10,
          }}
          imageUrl={image}
        />
        <View>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
              marginBottom: 3,
            }}>
            {title || '...'}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontWeight: '500',
                textTransform: 'capitalize',
                // color: colors.green,
              }}>
              {runner ? stage?.text || '...' : 'Not taken yet...'}
            </Text>
            <Text
              style={{
                marginRight: 10,
                fontSize: 14,
                fontWeight: '700',
                color: colors.green,
              }}>
              GHS {cost + reward}
            </Text>
          </View>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'auto'}}>
        <Text style={{marginLeft: 'auto', fontSize: 12}}>
          {getTimeAgo(createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
