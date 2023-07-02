import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../styles';

const GButton = ({children, style, variant = 'red', textStyle}) => {
  const themes = {
    red: {backgroundColor: colors.red},
    green: {backgroundColor: colors.green},
    black: {backgroundColor: colors.black},
  };

  const btnTheme = themes[variant] || themes.red;
  return (
    <TouchableNativeFeedback
      // onPress={handlePress}
      background={TouchableNativeFeedback.Ripple('white')}>
      <View style={{...styles.button, ...btnTheme, ...(style || {})}}>
        <Text style={{...styles.buttonText, ...(textStyle || {})}}>
          {children || 'CLICK HERE'}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default GButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 13,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
