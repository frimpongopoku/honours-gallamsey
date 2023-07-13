import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../../styles';

import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const GButton = props => {
  const {
    children,
    style,
    variant = 'red',
    textStyle,
    onPress,
    likeLink,
    rippleColor,
    floating,
    loading,
    disabled,
  } = props;
  const themes = {
    red: {backgroundColor: colors.red},
    green: {backgroundColor: colors.green},
    black: {backgroundColor: colors.black},
  };

  const btnTheme = themes[variant] || themes.red;

  const handlePress = () => {
    if (loading || disabled) return;
    onPress && onPress();
  };

  if (floating) return <FloatingButton {...props} />;
  if (likeLink) return <BtnLikeLink {...props} />;
  return (
    <TouchableNativeFeedback
      onPress={handlePress}
      // onPress={handlePress}
      background={TouchableNativeFeedback.Ripple(rippleColor || 'white')}>
      <View
        style={{
          ...styles.button,
          ...btnTheme,
          ...(style || {}),
          ...(disabled ? styles.disabled : {}),
        }}>
        {loading && <ActivityIndicator style={{marginRight: 7}} />}
        <Text style={{...styles.buttonText, ...(textStyle || {})}}>
          {children || 'CLICK HERE'}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default GButton;

const BtnLikeLink = ({style, onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{textDecorationLine: 'underline', ...(style || {})}}>
        {children || 'click here...'}
      </Text>
    </TouchableOpacity>
  );
};

const FloatingButton = ({onPress, children, style, iconOptions}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 100,
        right: 20,
        padding: 15,
        borderRadius: 55,
        backgroundColor: colors.green,
        elevation: 15,
        ...(style || {}),
      }}>
      {children}
      {iconOptions && (
        <FontAwesomeIcon
          icon={iconOptions?.icon || faCheck}
          color={iconOptions?.color || 'white'}
          size={iconOptions?.size || 28}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 180,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 13,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // borderRadius: 5,
  },
  disabled: {
    backgroundColor: 'grey',
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
