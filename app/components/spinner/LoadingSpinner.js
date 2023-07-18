import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingSpinner = ({text, color, size, children, style}) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      }}>
      <ActivityIndicator color={color || 'black'} size={size || 40} />
      <Text style={style || {color: 'white'}}>{text || 'loading...'}</Text>
      {children}
    </View>
  );
};

export default LoadingSpinner;
