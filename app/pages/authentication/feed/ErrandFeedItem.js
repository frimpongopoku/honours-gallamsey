import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../../styles';
import ImagePro from '../../../components/image/ImagePro';
import {useNavigation} from '@react-navigation/native';

const ErrandFeedItem = ({}) => {
  const navigation = useNavigation();
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
          imageUrl="https://i.pravatar.cc/300"
        />
        <View>
          <Text style={{fontWeight: '600', color: 'black', fontSize: 18}}>
            Portia Adjetey
          </Text>
          <Text>40 mins ago</Text>
        </View>

        <View style={{marginLeft: 'auto'}}>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faEllipsisH} size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewErrand')}
        style={{paddingHorizontal: 15}}>
        <ImagePro
          style={{borderRadius: 10, height: 250}}
          imageUrl="https://picsum.photos/600"
        />
        {/* <Image
          style={{borderRadius: 10, height: 250}}
          onLoad={e => console.log('Image DON LOAD')}
          source={{uri: 'https://i.pravatar.cc/600'}}
        /> */}
        <Text style={{marginVertical: 10, color: 'black', fontWeight: '500'}}>
          Delivery destination is only 3 mins walk away
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{fontWeight: 'bold', color: colors.black, fontSize: 20}}>
              GHS 150
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
              + GHS 25
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
