import {View, Text} from 'react-native';
import React from 'react';
import GButton from '../button/Button';

const AsDialogBox = ({textOptions, yesOptions, noOptions}) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          width: '80%',
          textAlign: 'center',
        }}>
        {textOptions?.text || '...'}
      </Text>
      <View style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
        <GButton
          variant="red"
          textStyle={{fontSize: 11}}
          style={{
            width: '35%',
            paddingHorizontal: 10,
            marginRight: 20,
            ...(noOptions?.style || {}),
          }}>
          {noOptions?.text || 'NO'}
        </GButton>
        <GButton
          variant="black"
          textStyle={{fontSize: 11}}
          style={{
            width: '35%',
            paddingHorizontal: 10,
            ...(yesOptions?.style || {}),
          }}>
          {yesOptions?.text || 'YES'}
        </GButton>
      </View>
    </View>
  );
};

export default AsDialogBox;
