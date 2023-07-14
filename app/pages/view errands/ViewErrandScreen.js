import {View, Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleUniversalModal} from '../../redux/actions/actions';
import AsDialogBox from '../../components/modal/AsDialogBox';

const ViewErrandScreen = ({toggleModal}) => {
  const [running, setRunning] = useState(false);
  return (
    <GBottomSheet
      // generics={{snapPoints: ['30%', '60%']}}
      generics={{snapPoints: ['30%']}}
      sheetContent={
        running ? (
          <CanCancelRunningErrand
            done={() => {
              console.log('Done is tapped');
              toggleModal({show: true, component: <AsDialogBox />});
            }}
            cancel={() => setRunning(false)}
          />
        ) : (
          <AboutToPickErrand pickErrand={() => setRunning(true)} />
        )
      }>
      <Toolbar title="A new pair of shoes" />
      <ScrollView
        style={{marginBottom: 220, width: '100%', backgroundColor: 'white'}}>
        <View>
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

          {running ? <ErrandStateTracker /> : <DetailsOfErrand />}
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({toggleModal: toggleUniversalModal}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewErrandScreen);
