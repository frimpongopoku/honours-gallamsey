import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import PageTitle from '../../components/intros/PageTitle';
import {SmallErrandItem} from './RunningErrands';
import {STAGES} from '../view errands/ErrandStateTracker';
import ImagePro from '../../components/image/ImagePro';
import {colors} from '../../styles';
import {connect} from 'react-redux';
import {LOADING} from '../authentication/constants';

const YourErrandPosts = ({myErrands}) => {
  if (myErrands === LOADING) return <ActivityIndicator color="red" size={40} />;
  return (
    <ScrollView>
      <PageTitle
        v2
        title="Your Posts"
        subtext="Here are the errands you have posted"
      />

      <View style={{}}>
        {myErrands?.map((errand, index) => (
          <View key={index?.toString()}>
            <MyPostErrandItem {...errand} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({myErrands: state.yourPosts});
export default connect(mapStateToProps)(YourErrandPosts);
export const MyPostErrandItem = ({
  cost,
  images,
  reward,
  title,
  status,
  createdAt,
}) => {
  const image = (images || [])[0];
  const stage = STAGES.find(item => item.key === status);
  return (
    <TouchableOpacity
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
              {stage?.text || '...'}
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
        <Text style={{marginLeft: 'auto', fontSize: 12}}>{createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
};
