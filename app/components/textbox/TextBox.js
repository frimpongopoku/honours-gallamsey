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
  style,
  containerStyle,
  onChange,
  name,
  value,
  labelStyle,
}) => {
  const handleChanges = text => {
    // console.log('What is typed', text);
    if (onChange) onChange({[name]: text});
  };
  return (
    <View style={{padding: 10, ...(containerStyle || {})}}>
      <Text style={{...styles.label, ...(labelStyle || {})}}>
        {label || 'Text'}
      </Text>
      <TextInput
        // value={value || ''}
        onChangeText={handleChanges}
        multiline={textarea}
        numberOfLines={textarea ? 10 : 1}
        textAlignVertical={textarea ? 'top' : 'auto'}
        style={{...styles.input, ...(style || {})}}
        placeholder={placeholder || 'Enter your text...'}
        placeholderTextColor={colors.black}
        {...(generics || {})}
      />
      {children}
    </View>
  );
};

export default TextBox;
