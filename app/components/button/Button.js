import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
  } = props;
  const themes = {
    red: {backgroundColor: colors.red},
    green: {backgroundColor: colors.green},
    black: {backgroundColor: colors.black},
  };

  const btnTheme = themes[variant] || themes.red;

  // if (floating) return <FloatingButton {...props} />;
  if (likeLink) return <BtnLikeLink {...props} />;
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      // onPress={handlePress}
      background={TouchableNativeFeedback.Ripple(rippleColor || 'white')}>
      <View style={{...styles.button, ...btnTheme, ...(style || {})}}>
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

// const FloatingButton = ({onPress, children, style}) => {
//   return (
//     <TouchableOpacity
//       style={{...styles.floatingContainer, ...(style || {})}}
//       onPress={onPress}>
//       {children}
//       {/* <FontAwesomeIcon icon={faPlus} style={styles.icon} /> */}
//     </TouchableOpacity>
//   );
// };

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
