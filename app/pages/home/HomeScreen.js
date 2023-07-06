import {View, Text} from 'react-native';
import React from 'react';
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
  faRunning,
} from '@fortawesome/free-solid-svg-icons';
import Feed from '../authentication/feed/Feed';
import NotificationScreen from '../notifications/NotificationScreen';
import {colors} from '../../styles';

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
const HomeScreen = () => {
  const {aboveBottomNav} = fetchHeights();

  return (
    <SafeAreaView>
      <View
        style={{
          height: aboveBottomNav,
          backgroundColor: 'white',
        }}>
        <Toolbar title="Gallamsey" />
        <TabView pages={TABS} activeKey="notifications" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
