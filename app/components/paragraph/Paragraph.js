import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {colors} from '../../styles';

const Paragraph = ({style, generics, children}) => {
  return (
    <Text
      style={{
        padding: 15,
        color: colors.black,
        lineHeight: 23,
        fontWeight: '500',
        fontSize: 16,
        ...(style || {}),
      }}
      {...(generics || {})}>
      {children}
    </Text>
  );
};

export default Paragraph;
