import {Dimensions, StatusBar} from 'react-native';
import storage from '@react-native-firebase/storage';



export const errorStyles = {
  labelStyle: {color: 'red'},
  inputStyle: {borderColor: 'red', color: 'red'},
};

export const getError = (name, errors) => {
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

export const uploadImageToFirebase = async (image, options, cb) => {
  // console.log('------------------------------');
  // console.log('MULTIPLE STATUS: INDEXJS:', options, image);
  // if (!image) return cb && cb([]);
  // if (options?.multiple) {
  //   const urls = [];
  //   const newOptions = {...options, multiple: false};

  //   for (img of image) {
  //     uploadImageToFirebase(img, newOptions, url => {
  //       console.log('URL FOUND HERE', url);
  //       if (url) urls.push(url);
  //     });
  //   }
  //   console.log('........URLS', urls);
  //   return cb && cb(urls);
  // }
  try {
    const {fileName, collectionName} = options;
    const imageName =
      fileName || image.path?.substring(image.path.lastIndexOf('/') + 1);
    const reference = storage().ref(
      `/${collectionName || 'gallamsey'}/${imageName}`,
    );
    const task = reference.putFile(image.path);
    task.on(
      'state_changed',
      null,
      error => {
        console.error('Error uploading image:', error);
        cb && cb(null, error?.toString());
      },
      async () => {
        const url = await reference.getDownloadURL();
        cb && cb(url);
      },
    );
  } catch (error) {
    console.error('Error uploading image (try/catch):', error);
    cb && cb(null, error?.toString());
  }
};
