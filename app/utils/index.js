import {Dimensions, Platform, StatusBar} from 'react-native';
import storage from '@react-native-firebase/storage';
import DeviceInfo from 'react-native-device-info';
import {formatDistanceStrict} from 'date-fns';

const WAIT_TIME = 30
// const WAIT_TIME = 3
export function itsBeenMoreThan30Minutes(dateString1, dateString2) {
  if (!dateString1 || !dateString2) return false;
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // Calculate the difference in milliseconds between the two dates
  const differenceInMillis = Math.abs(date1 - date2);

  // Calculate the difference in minutes
  const differenceInMinutes = differenceInMillis / (1000 * 60);
  console.log("Thats the difference", differenceInMinutes)

  // Check if the difference is greater than 30 minutes
  return differenceInMinutes > WAIT_TIME;
}

export const getTimeAgo = dateString => {
  const date = new Date(dateString);
  const now = new Date();

  // Format the date as "time ago"
  // const timeAgo = formatDistanceToNow(date, {addSuffix: true});
  const timeAgo = formatDistanceStrict(date, now, {addSuffix: true});

  return timeAgo;
};
export const isEmulator = () => {
  const level = DeviceInfo.getApiLevel()?._j;
  return level === 32; // NB: this works only cos the genymotion device emulator I use is on api level 32, and my physical device is on 31
  // return Platform.OS === 'android' && DeviceInfo.isEmulator();

  // if (Platform.OS === 'android') {
  //   // Check if the manufacturer name contains "Genymotion" (case-insensitive).
  //   return DeviceInfo.getManufacturer().toLowerCase().includes('genymotion');
  // }
  // return false; // Return false for other platforms (iOS, etc.).
};

// export const isEmulator = () => {
//   return (
//     Platform.OS === 'android' &&
//     Platform.isTV === false &&
//     Platform.isTesting === false
//   );
// };

export function smartString(str, length) {
  if (!length) return str;
  if (str?.length <= length) {
    return str;
  }
  return str?.slice(0, length) + '...';
}

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
  let aboveBottomNav;
  if (isEmulator())
    aboveBottomNav = _window + (bottomNavHeight + 2.38 * bottomNavHeight);
  else aboveBottomNav = _window - (bottomNavHeight + 0.26 * bottomNavHeight);
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
