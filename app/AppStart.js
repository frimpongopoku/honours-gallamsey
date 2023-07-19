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
import GBottomSheet from './components/bottomsheet/GBottomSheet';
import TabView from './components/tabs/TabView';
import Toolbar from './components/toolbar/Toolbar';
import GModal from './components/modal/Modal';
import WIthIconAndText from './components/modal/WIthIconAndText';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {colors} from './styles';
import AsDialogBox from './components/modal/AsDialogBox';
import {bindActionCreators} from 'redux';
import {testReduxAction} from './redux/actions/actions';
import {connect} from 'react-redux';
// import GBottomSheet from './bottomsheet/GBottomSheet';
function App({test, testValue}) {
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

      <Toolbar
        title="Gallamsey"
        onBackPress={() => {
          test(500);
      
        }}
      />
      <TextBox />
      {/* <View style={{marginTop:20}}></View> */}
      <GModal>
        {/* <WIthIconAndText
          iconOptions={{icon: faCheckCircle, color: colors.green}}
          textOptions={{
            text: 'This is your first positive notification. Dont think it means anything! Lmfao!',
          }}
        /> */}
        <AsDialogBox
          textOptions={{
            text: 'This is your first question that I am going to ask you. Are you ready for it my gee?',
          }}
        />
      </GModal>
      {/* <TabView /> */}

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

const mapStateToProps = state => {
  return {testValue: state.testStore};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      test: testReduxAction,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
