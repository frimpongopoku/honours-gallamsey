import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Toolbar from '../../components/toolbar/Toolbar';
import TabView from '../../components/tabs/TabView';
import {fetchHeights} from '../../utils';
import RunningErrands from '../errands/RunningErrands';
import YourErrandPosts from '../errands/YourErrandPosts';
import {
  faBell,
  faHome,
  faPaperPlane,
  faPlus,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';
import Feed from '../authentication/feed/Feed';
import NotificationScreen from '../notifications/NotificationScreen';
import {colors} from '../../styles';
import GButton from '../../components/button/Button';
import {apiCall} from '../../api/messenger';
import {ALL_ERRANDS} from '../../api/urls';

const TABS = [
  {
    key: 'home',
    name: 'Home',
    icon: faHome,
    component: <Feed />,
  },
  {
    key: 'errands',
    name: 'Errands',
    icon: faRunning,
    component: <RunningErrands />,
  },
  {
    key: 'posts',
    name: 'Your Posts',
    icon: faPaperPlane,
    component: <YourErrandPosts />,
  },
  {
    key: 'notifications',
    name: 'Notifications',
    icon: faBell,
    component: <NotificationScreen />,
  },
];
const HomeScreen = ({navigation}) => {
  const {aboveBottomNav} = fetchHeights();
  useEffect(() => {
    apiCall(ALL_ERRANDS, {}, response => {
      console.log('LE_API_RESPONSE{', response);
    });
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          height: aboveBottomNav,
          backgroundColor: 'white',
        }}>
        <Toolbar
          onUserPress={() => navigation.navigate('ViewProfile')}
          onCogPress={() => navigation.navigate('Settings')}
          title="Gallamsey"
          v2
        />

        <TabView pages={TABS} activeKey="home" />
        <GButton
          onPress={() => navigation.navigate('CreateErrand')}
          style={{bottom: 20, elevation: 30}}
          floating
          iconOptions={{icon: faPlus}}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
