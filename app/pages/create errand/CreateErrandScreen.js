import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toolbar from '../../components/toolbar/Toolbar';
import TabView from '../../components/tabs/TabView';
import {faCamera, faPen, faPiggyBank} from '@fortawesome/free-solid-svg-icons';
import SecondStage from './SecondStage';
import ThirdStage from './ThirdStage';
import FirstStage from './FirstStage';
import {fetchHeights} from '../../utils';

const TABS = [
  {
    key: 'description',
    name: 'Description',
    title: 'Create New Errand',
    icon: faPen,
    component: <FirstStage />,
  },
  {
    key: 'images',
    name: 'images',
    title: 'Add Images',
    icon: faCamera,
    component: <SecondStage />,
  },
  {
    key: 'cost',
    name: 'cost',
    title: 'Estimate Cost & Pay',
    icon: faPiggyBank,
    component: <ThirdStage />,
  },
];
const CreateErrandScreen = () => {
  const [currentTab, setCurrentTab] = useState({});
  const {aboveBottomNav} = fetchHeights();
  return (
    <SafeAreaView>
      <View
        style={{
          height: aboveBottomNav,
          backgroundColor: 'white',
        }}>
        <Toolbar title={currentTab?.title || 'Create New Errand'} />

        <TabView
          pages={TABS}
          activeKey="description"
          notifyOnChange={tab => setCurrentTab(tab)}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateErrandScreen;
