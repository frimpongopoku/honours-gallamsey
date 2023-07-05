import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import {colors} from '../../styles';
import Paragraph from '../../components/paragraph/Paragraph';
import {ScrollView} from 'react-native-gesture-handler';
import GButton from '../../components/button/Button';
import ImagePro from '../../components/image/ImagePro';
import GBottomSheet from '../../components/bottomsheet/GBottomSheet';
import AboutToPickErrand from './AboutToPickErrand';
import CanCancelRunningErrand from './CanCancelRunningErrand';
import DenyTransfer from './DenyTransfer';
import DetailsOfErrand from './DetailsOfErrand';
import ErrandStateTracker from './ErrandStateTracker';

const ViewErrandScreen = () => {
  return (
    <GBottomSheet
      // generics={{snapPoints: ['30%', '60%']}}
      generics={{snapPoints: ['30%']}}
      sheetContent={<AboutToPickErrand />}>
      <Toolbar
        title="A new pair of shoes"
        onBackPress={() => console.log('Trying to go back from viewing errand')}
      />
      <ScrollView style={{marginBottom: 220, width: '100%'}}>
        <View >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                padding: 10,
                fontWeight: '600',
                fontSize: 18,
                backgroundColor: '#FFCACA',
                textAlign: 'center',
                color: colors.red,
                flex: 1,
              }}>
              GHS 150
            </Text>
            <Text
              style={{
                padding: 10,
                fontWeight: '600',
                fontSize: 18,
                backgroundColor: '#D3FFE0',
                color: colors.green,
                textAlign: 'center',
                flex: 1,
              }}>
              GHS 25
            </Text>
          </View>
          {/* <DetailsOfErrand /> */}

          <ErrandStateTracker />
        </View>
      </ScrollView>
      <GButton
        style={{padding: 5, backgroundColor: '#F0F0F0', bottom: 230}}
        floating>
        <ImagePro
          imageUrl="https://i.pravatar.cc/300"
          style={{borderRadius: 55, width: 60, height: 60}}
        />
      </GButton>
    </GBottomSheet>
  );
};

export default ViewErrandScreen;
