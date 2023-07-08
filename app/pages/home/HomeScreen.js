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
  faPlus,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';
import Feed from '../authentication/feed/Feed';
import NotificationScreen from '../notifications/NotificationScreen';
import {colors} from '../../styles';
import GButton from '../../components/button/Button';

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

  return (
    <SafeAreaView>
      <View
        style={{
          height: aboveBottomNav,
          backgroundColor: 'white',
        }}>
        <Toolbar
          onUserPress={() => navigation.navigate('ViewProfile')}
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
