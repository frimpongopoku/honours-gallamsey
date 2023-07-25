import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../../styles';
import ImagePro from '../../../components/image/ImagePro';
import {useNavigation} from '@react-navigation/native';

const ErrandFeedItem = ({user, errand}) => {
  const navigation = useNavigation();
  const {poster, title, createdAt, images, cost, reward, distance} =
    errand || {};
  const kms = Math.round((distance / 1000) * 100) / 100;

  const locations = user?.locations;
  const preferences = user?.preferences;

  return (
    <View style={{marginBottom: 15}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}>
        <ImagePro
          style={{
            height: 55,
            width: 55,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: colors.red,
            marginRight: 15,
          }}
          imageUrl={poster?.image}
        />
        <View>
          <Text style={{fontWeight: '600', color: 'black', fontSize: 18}}>
            {poster?.name}
          </Text>
          <Text>{createdAt || '...'}</Text>
        </View>

        <View style={{marginLeft: 'auto'}}>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faEllipsisH} size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          color: colors.black,
          fontWeight: '700',
        }}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewErrand', {data: errand})}
        style={{paddingHorizontal: 15}}>
        <ImagePro
          style={{borderRadius: 10, height: 250}}
          imageUrl={(images || [])[0] || 'https://picsum.photos/600'}
        />
        {/* <Image
          style={{borderRadius: 10, height: 250}}
          onLoad={e => console.log('Image DON LOAD')}
          source={{uri: 'https://i.pravatar.cc/600'}}
        /> */}
        {/* {showDistanceInformation ? ( */}
        {locations?.length && preferences?.closeToMe ? (
          <Text style={{marginVertical: 10, color: 'black', fontWeight: '500'}}>
            Delivery destination is only {kms} kilometers away
          </Text>
        ) : (
          <View style={{marginVertical: 6}}></View>
        )}
        {/* ) : (
          <View style={{marginVertical: 6}}></View>
        )} */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{fontWeight: 'bold', color: colors.black, fontSize: 20}}>
              GHS {cost}
            </Text>
            <Text
              style={{fontWeight: '500', fontSize: 16, color: colors.black}}>
              Cost of errand
            </Text>
          </View>
          <View style={{marginLeft: 'auto'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.green,
                fontSize: 20,
                textAlign: 'right',
              }}>
              + GHS {reward}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                color: colors.green,
                textAlign: 'right',
              }}>
              You earn
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  posterImage: {},
});

export default ErrandFeedItem;
