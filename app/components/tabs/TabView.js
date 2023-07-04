import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Selectors from './Selectors';
import {
  faCoffee,
  faHome,
  faPaperPlane,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';
import SlideInView from '../../animated/SlideInView';
import GButton from '../button/Button';

const DEFAULT_TABS = [
  {
    key: 'home',
    name: 'Home',
    icon: faHome,
    component: (
      <View style={{backgroundColor: 'green', height: '100%'}}>
        <Text>New Home page</Text>
        <GButton
          onPress={() =>
            console.log('I am not sure what you are on about oo man')
          }>
          LEt see meerhn
        </GButton>
      </View>
    ),
  },
  {
    key: 'errands',
    name: 'Errands',
    icon: faRunning,
    // component: <Text>New Errands page</Text>,
    component: (
      <SlideInView key={1}>
        <View style={{height: '100%', backgroundColor: 'yellow'}}>
          <Text>New Errands Page</Text>
        </View>
      </SlideInView>
    ),
  },
  {
    key: 'posts',
    name: 'Your Posts',
    icon: faPaperPlane,
    // component: <Text>New Running page</Text>,
    component: (
      <SlideInView key={1}>
        <View style={{height: '100%', backgroundColor: 'blue'}}>
          <Text>New Posts Page</Text>
        </View>
      </SlideInView>
    ),
  },
];

const TabView = ({
  pages = DEFAULT_TABS,
  activeKey = 'home',
  notifyOnChange,
}) => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const found = pages?.find(item => item.key === activeKey);
    if (found) setPage(found);
    // else setPage(pages || [])[0];
  }, []);

  const swapTabs = tabKey => {
    const found = pages?.find(item => item.key === tabKey);
    notifyOnChange && notifyOnChange(found, tabKey);
    if (found) setPage(found);
  };

  return (
    <View style={styles.container}>
      <View style={{backgrounColor: 'blue'}}>{page?.component}</View>
      <Selectors selectors={pages} onChange={swapTabs} activeKey={page?.key} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // backgroundColor: 'red',
  },
});

export default TabView;
