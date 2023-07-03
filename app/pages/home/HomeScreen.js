import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Toolbar from '../../components/toolbar/Toolbar';
import TabView from '../../components/tabs/TabView';
import {fetchHeights} from '../../utils';
import RunningErrands from '../errands/RunningErrands';
import YourErrandPosts from '../errands/YourErrandPosts';
import ErrandFeed from './ErrandFeed';
import {
  faHome,
  faPaperPlane,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';

const TABS = [
  {
    key: 'home',
    name: 'Home',
    icon: faHome,
    component: <ErrandFeed />,
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
];
const HomeScreen = () => {
  const {aboveBottomNav} = fetchHeights();

  return (
    <SafeAreaView>
      <View
        style={{
          height: aboveBottomNav,
        }}>
        <Toolbar title="Gallamsey" />
        <TabView pages={TABS} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
