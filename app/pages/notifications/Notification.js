import {View, Text} from 'react-native';
import React from 'react';
import ImagePro from '../../components/image/ImagePro';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle, faRunning} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../styles';

const Notification = ({complete, title, subtext, date}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: colors.lightGrey,
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}>
      <ImagePro
        imageUrl="https://i.pravatar.cc/300"
        style={{
          height: 60,
          width: 60,
          borderRadius: 55,
          borderWidth: 3,
          borderColor: colors.transRed,
        }}
      />
      <View style={{marginHorizontal: 15}}>
        <Text style={{fontWeight: '600', color: colors.black, fontSize: 16}}>
          {title || 'Buy me new shoes'}
        </Text>
        <Text style={{fontWeight: '500', color: colors.green, fontSize: 14}}>
          {subtext || 'Lydia picked your errand up'}
        </Text>
        <Text>30 seconds ago</Text>
      </View>
      <FontAwesomeIcon
        style={{marginLeft: 'auto'}}
        icon={complete ? faCheckCircle : faRunning}
        size={28}
        color={colors.green}
      />
    </View>
  );
};

export default Notification;
