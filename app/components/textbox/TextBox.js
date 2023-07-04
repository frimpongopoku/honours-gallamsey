import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../styles';

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.black,
  },
  input: {
    borderWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: colors.black,
    marginTop: 10,
    fontSize: 16,
  },
});
const TextBox = ({
  textarea = false,
  label,
  placeholder,
  generics,
  children,
}) => {
  return (
    <View style={{padding: 10}}>
      <Text style={styles.label}>{label || 'Text'}</Text>
      <TextInput
        multiline={textarea}
        numberOfLines={textarea ? 6 : 1}
        textAlignVertical={textarea ? 'top' : 'auto'}
        style={styles.input}
        placeholder={placeholder || 'Enter your text...'}
        placeholderTextColor={colors.black}
        {...(generics || {})}
      />
      {children}
    </View>
  );
};

export default TextBox;
