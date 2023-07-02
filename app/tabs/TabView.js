import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Selectors from './Selectors';
import {
  faCoffee,
  faHome,
  faPaperPlane,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';

const TABS = [
  {
    key: 'home',
    name: 'Home',
    icon: faHome,
    component: (
      <View style={{backgroundColor: 'green', height: "100%"}}>
        <Text>New Home page</Text>
      </View>
    ),
  },
  {
    key: 'errands',
    name: 'Errands',
    icon: faRunning,
    component: <Text>New Errands page</Text>,
  },
  {
    key: 'posts',
    name: 'Your Posts',
    icon: faPaperPlane,
    component: <Text>New Running page</Text>,
  },
];

const TabView = ({pages = TABS, activeKey = 'home'}) => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const found = pages?.find(item => item.key === activeKey);
    if (found) setPage(found);
    // else setPage(pages || [])[0];
  }, []);

  const swapTabs = tabKey => {
    const found = pages?.find(item => item.key === tabKey);
    if (found) setPage(found);
  };

  return (
    <View style={styles.container}>
      <View style={{height: '95%', backgrounColor: 'blue'}}>
        {page?.component}
      </View>

      <Selectors selectors={pages} onChange={swapTabs} activeKey={page?.key} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'red',
  },
});

export default TabView;
