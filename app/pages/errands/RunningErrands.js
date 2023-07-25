import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import PageTitle from '../../components/intros/PageTitle';
import ImagePro from '../../components/image/ImagePro';
import {colors} from '../../styles';
import {connect} from 'react-redux';
import {LOADING} from '../authentication/constants';
import {STAGES} from '../view errands/ErrandStateTracker';
import {useNavigation} from '@react-navigation/native';
import {bindActionCreators} from 'redux';
import {fetchMyRunningErrands} from '../../redux/actions/actions';

const RunningErrands = ({running, fetchMyErrands, user}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    fetchMyErrands(user, () => {
      console.log('Finished refreshing running errands!');
      setRefreshing(false);
    });
    // fetchData();
    // setIsRefreshing(false);
  };
  if (running === LOADING) return <ActivityIndicator color="red" size={40} />;

  const navigation = useNavigation();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <PageTitle
        v2
        title="Running Errands"
        subtext="Here are the errands you are running/completed"
      />

      <View style={{}}>
        {running?.map((errand, index) => (
          <View key={index?.toString()}>
            <SmallErrandItem
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
  running: state.runningErrands,
  user: state.user,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMyErrands: fetchMyRunningErrands,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(RunningErrands);

export const SmallErrandItem = ({
  cost,
  images,
  reward,
  title,
  status,
  children,
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
      }}>
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
    </TouchableOpacity>
  );
};
