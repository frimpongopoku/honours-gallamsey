import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import TextBox from './components/textbox/TextBox';
import GButton from './components/button/Button';
import GDropdown from './components/dropdown/Dropdown';
// import BottomSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import GBottomSheet from './bottomsheet/GBottomSheet';
import TabView from './tabs/TabView';
// import GBottomSheet from './bottomsheet/GBottomSheet';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <TabView />

      {/* <View
        style={{
          backgroundColor: 'white',
          height: '100%',
          position: 'relative',
        }}> */}
        {/* <ScrollView contentInsetAdjustmentBehavior="automatic"> */}
        {/* <View>
          <TextBox />
          <GButton />
          <GDropdown />
          <GButton />
        </View> */}
      
          {/* <GBottomSheet /> */}
    
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
