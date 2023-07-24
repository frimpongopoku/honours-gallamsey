import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {
  fetchMyRunningErrands,
  fetchNewsFeed,
  toggleUniversalModal,
} from '../../redux/actions/actions';
import AsDialogBox from '../../components/modal/AsDialogBox';
import {faFileLines} from '@fortawesome/free-solid-svg-icons';
import {apiCall} from '../../api/messenger';
import {ENGAGE_ERRAND, PICK_ERRAND} from '../../api/urls';

const ViewErrandScreen = ({
  toggleModal,
  navigation,
  route,
  user,
  refreshNewsFeed,
  refreshRunningErrands,
}) => {
  const [running, setRunning] = useState(false);
  const [errand, setErrand] = useState({});

  const authUserOwnsErrand = errand?.poster?.id === user?._id;
  useEffect(() => {
    const passedErrand = route.params?.data;
    setErrand(passedErrand || {});
    const isRunning =
      passedErrand?.status && passedErrand?.status !== 'default';
    setRunning(isRunning);
  }, [route]);

  console.log('Lets see errand', errand);

  const pickErrand = () => {
    const runner = {
      id: user?._id,
      name: user?.preferredName,
      image: user?.image,
      phone: user?.phone,
    };
    apiCall(PICK_ERRAND, {body: {runner, errand_id: errand?._id}}, response => {
      if (!response.success)
        return console.log('ENGAGEMENT ERROR: ', response.error);

      console.log('HERE IS THE RESPONSE');
      setRunning(true);
      setErrand(response.data);
      refreshNewsFeed(user);
      refreshRunningErrands(user);
    });
  };

  const switchStage = status => {
    apiCall(ENGAGE_ERRAND, {body: {status}}, response => {
      if (!response.success)
        return console.log('ENGAGEMENT ERROR: ', response.error);
      setErrand(response.data);
    });
  };
  const image = (errand?.images || [])[0];

  return (
    <GBottomSheet
      // generics={{snapPoints: ['30%', '60%']}}
      generics={{snapPoints: ['30%']}}
      sheetContent={
        running ? (
          <CanCancelRunningErrand
            done={() => {
              toggleModal({
                show: true,
                component: (
                  <AsDialogBox
                    textOptions={{
                      text: 'Errand is complete, so request for funds?',
                    }}
                    noOptions={{
                      text: 'NOT YET',
                      onPress: () => toggleModal({show: false}),
                    }}
                    yesOptions={{
                      onPress: () => {
                        navigation.navigate('Home');
                        toggleModal({show: false});
                      },
                    }}
                  />
                ),
              });
            }}
            cancel={() => setRunning(false)}
          />
        ) : (
          <AboutToPickErrand
            user={user}
            authUserOwnsErrand={authUserOwnsErrand}
            errand={errand}
            pickErrand={() => pickErrand()}
          />
        )
      }>
      <Toolbar title={errand?.title || '...'} />
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
              GHS {errand?.cost}
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
              GHS {errand?.reward}
            </Text>
          </View>
          {/* <DetailsOfErrand /> */}

          {running ? (
            <ErrandStateTracker switchStage={switchStage} errand={errand} />
          ) : (
            <DetailsOfErrand errand={errand} />
          )}
        </View>
      </ScrollView>
      {running && (
        <GButton
          onPress={() => setRunning(false)}
          iconOptions={{icon: faFileLines}}
          style={{bottom: 310, right: 25}}
          floating></GButton>
      )}
      {image && (
        <GButton
          style={{padding: 5, backgroundColor: '#F0F0F0', bottom: 230}}
          floating>
          <ImagePro
            imageUrl={image}
            style={{borderRadius: 55, width: 60, height: 60}}
          />
        </GButton>
      )}
    </GBottomSheet>
  );
};

const mapStateToProps = state => {
  return {user: state.user};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleModal: toggleUniversalModal,
      refreshRunningErrands: fetchMyRunningErrands,
      refreshNewsFeed: fetchNewsFeed,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewErrandScreen);
