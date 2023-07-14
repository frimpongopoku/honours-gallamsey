import {View, Text} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEllipsisH,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

const WIthIconAndText = ({iconOptions, textOptions}) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
      }}>
      <FontAwesomeIcon
        color={iconOptions?.color || 'black'}
        icon={iconOptions?.icon || faEllipsisH}
        size={35}
        style={{marginBottom: 10}}
      />
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          width: '80%',
          textAlign: 'center',
        }}>
        {textOptions?.text || '...'}
      </Text>
    </View>
  );
};

export default WIthIconAndText;
