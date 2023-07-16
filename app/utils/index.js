import {Dimensions, StatusBar} from 'react-native';

export const errorStyles = {
  labelStyle: {color: 'red'},
  inputStyle: {borderColor: 'red', color: 'red'},
};

export const getError = name => {
  const {labelStyle, inputStyle} = errorStyles;
  const message = errors[name];
  if (!message) return {};
  return {message, labelStyle, inputStyle};
};
export const fetchHeights = () => {
  const _window = Dimensions.get('window').height;
  const screen = Dimensions.get('screen').height;
  const bottomNavHeight = screen - (_window + StatusBar?.currentHeight);
  const aboveBottomNav = _window - (bottomNavHeight + 0.26 * bottomNavHeight);
  return {
    screenHeight: screen,
    windowHeight: _window,
    bottomNavigationHeight: bottomNavHeight,
    StatusBarHeight: StatusBar.currentHeight,
    aboveBottomNav,
  };
};
