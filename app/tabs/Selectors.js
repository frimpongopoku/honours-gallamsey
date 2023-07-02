import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {FontAwesome} from '@expo/vector-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {colors} from '../styles';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const Selectors = ({selectors, onChange, activeKey}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FBFBFB',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
      }}>
      {selectors.map(tab => {
        const theme = activeKey === tab.key ? colors.red : colors.grey;

        return (
          <TouchableOpacity
            onPress={() => onChange && onChange(tab?.key)}
            key={tab.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <FontAwesomeIcon
              style={{flex: 1}}
              icon={tab.icon}
              size={24}
              color={theme}
            />
            <Text style={{fontWeight: 'bold', color: theme}}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}

      {/* <FontAwesome name="fa-home"></FontAwesome> */}
    </View>
  );
};

// const styles = {
//   selected: {
//     color: colors.red,
//   },
// };

export default Selectors;
