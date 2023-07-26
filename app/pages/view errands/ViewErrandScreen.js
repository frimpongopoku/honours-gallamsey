import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
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
  fetchMyPosts,
  fetchMyRunningErrands,
  fetchNewsFeed,
  toggleUniversalModal,
} from '../../redux/actions/actions';
import AsDialogBox from '../../components/modal/AsDialogBox';
import {faFileLines, faMessage} from '@fortawesome/free-solid-svg-icons';
import {apiCall} from '../../api/messenger';
import {
  ENGAGE_ERRAND,
  FIND_ONE_ERRAND,
  FINISH_UP_ERRAND,
  PICK_ERRAND,
} from '../../api/urls';
import firestore from '@react-native-firebase/firestore';
import {LOADING} from '../authentication/constants';
import InReview from './InReview';

const ViewErrandScreen = ({
  toggleModal,
  navigation,
  route,
  user,
  refreshNewsFeed,
  refreshRunningErrands,
  refreshYourPosts,
}) => {
  const [running, setRunning] = useState(false);
  const [errand, setErrand] = useState(LOADING);

  const authUserOwnsErrand = errand?.poster?.id === user?._id;
  const isLoading = errand === LOADING;
  const isComplete = errand?.status === 'complete';

  useEffect(() => {
    const passedErrand = route.params?.data;
    apiCall(
      FIND_ONE_ERRAND,
      {body: {errand_id: passedErrand?._id}},
      response => {
        if (!response.success)
          return console.log(
            'Sorry could not find errand with id ' + passedErrand?._id,
          );

        setErrand(response.data);
      },
    );
  }, [route]);

  useEffect(() => {
    if (isLoading) return;
    setRunning(errand?.runner);
    const unsubscribe = firestore()
      .collection('Errands')
      .doc(errand?._id)
      .onSnapshot(documentSnapshot => {
        // Handle the updated data here
        const data = documentSnapshot.data();
        console.log('--------FROM FIRESTORE-----', data);
        if (!data) return;
        setRunning(data?.runner);
        setErrand(data);
      });
    return () => {
      unsubscribe();
    };
  }, [errand?._id]);

  const refresh = () => {
    refreshNewsFeed(user);
    refreshRunningErrands(user);
    refreshYourPosts(user);
  };
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

      console.log('HERE IS THE RESPONSE IN PICK ERRAND FUNCTION: ', response);
      setRunning(true);
      setErrand(response.data);
      // refreshNewsFeed(user);
      // refreshRunningErrands(user);
      refresh();
    });
  };

  const switchStage = status => {
    const others =
      status.key === 'complete'
        ? {completedAt: new Date().toISOString()}
        : {completedAt: null};
    apiCall(
      ENGAGE_ERRAND,
      {
        body: {
          data: {status: status?.key, ...others},
          errand_id: errand?._id,
          user_id: user?._id,
        },
      },
      response => {
        if (!response.success)
          return console.log('ENGAGEMENT ERROR: ', response.error);
        setErrand(response.data);
      },
    );
  };
  const image = (errand?.images || [])[0];

  const runnerIsCancelling = () => {
    apiCall(
      PICK_ERRAND,
      {body: {cancel: true, errand_id: errand?._id, runner_id: user?._id}},
      response => {
        toggleModal({show: false});
        if (!response.success)
          return console.log(
            'Sorry could not cancel running errand...',
            response,
          );
        console.log('RESPONSE AFTER CANCELLING ---> ', response);
        // Now recall user running errands and users posts
        navigation.goBack();
        refresh();
      },
    );
  };

  const doReview = () => {
    apiCall(
      ENGAGE_ERRAND,
      {
        body: {
          data: {inReview: true},
          errand_id: errand?._id,
          user_id: user?._id,
        },
      },
      response => {
        if (!response.success)
          return console.log('REVIEW REQUEST ERROR: ', response.error);
        setErrand(response.data);
      },
    );
  };

  const requestReview = () => {
    toggleModal({
      show: true,
      component: (
        <AsDialogBox
          textOptions={{
            text: `By doing this, you are refusing to send the runner the funds, and you need a third party to resolve the situation. The team will contact both parties soon!`,
          }}
          noOptions={{
            text: 'NO',
            onPress: () => toggleModal({show: false}),
          }}
          yesOptions={{
            text: 'YES, GO AHEAD',
            onPress: () => {
              // finishErrand();
              doReview();
              toggleModal({show: false});
            },
          }}
        />
      ),
    });
  };

  const finishErrand = () => {
    apiCall(
      FINISH_UP_ERRAND,
      {
        body: {
          errand_id: errand?._id,
          data: {status: 'transferred', inReview: false},
          runner_id: errand?.runner?.id,
          poster_id: user?._id,
        },
      },
      response => {
        toggleModal({show: false});
        console.log('RESPONSE AFTER FINISHING:::', response);
      },
    );
  };
  const sendFunds = () => {
    const total = errand?.reward + errand?.cost;

    toggleModal({
      show: true,
      component: (
        <AsDialogBox
          textOptions={{
            text: `You will be transferring an amount of GHS ${total} to ${errand?.runner?.name}, to denote the full completion of this errand. `,
          }}
          noOptions={{
            text: 'NO',
            onPress: () => toggleModal({show: false}),
          }}
          yesOptions={{
            text: 'YES, GO AHEAD',
            onPress: () => {
              finishErrand();
            },
          }}
        />
      ),
    });
  };

  if (isLoading)
    return (
      <View>
        <Toolbar title={errand?.title || '...'} />
        <ActivityIndicator color="red" size={40} />
      </View>
    );

  if (!errand)
    return (
      <Text
        style={{padding: 20, color: 'black', fontWeight: '600', fontSize: 16}}>
        Sorry, could not find the errand you are looking for...
      </Text>
    );

  const chatKey = errand?.poster?.id + errand?.runner?.id + errand?._id; // posterid+runnerid+errandid
  const isInReview = errand?.inReview;
  return (
    <GBottomSheet
      // generics={{snapPoints: ['30%', '60%']}}
      generics={{snapPoints: isInReview ? ['33%'] : ['30%']}}
      sheetContent={
        isInReview ? (
          <InReview
            errand={errand}
            ownsThis={authUserOwnsErrand}
            sendFunds={sendFunds}
          />
        ) : (
          <>
            {running ? (
              <CanCancelRunningErrand
                sendFunds={sendFunds}
                requestReview={requestReview}
                errand={errand}
                ownsThis={authUserOwnsErrand}
                runner={errand?.runner}
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
                cancel={() => {
                  toggleModal({
                    show: true,
                    component: (
                      <AsDialogBox
                        textOptions={{
                          text: 'Are you sure you want to cancel running this errand?',
                        }}
                        noOptions={{
                          text: 'NO',
                          onPress: () => toggleModal({show: false}),
                        }}
                        yesOptions={{
                          onPress: () => {
                            runnerIsCancelling();
                          },
                        }}
                      />
                    ),
                  });
                }}
              />
            ) : (
              <AboutToPickErrand
                user={user}
                authUserOwnsErrand={authUserOwnsErrand}
                errand={errand}
                pickErrand={() => pickErrand()}
                seeInstructions={() => setRunning(true)}
              />
            )}
          </>
        )
      }>
      <Toolbar title={errand?.title || '...'} />

      <ScrollView
        style={{
          marginBottom: 220,
          width: '100%',
          backgroundColor: 'white',
        }}>
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

          {running ? (
            <ErrandStateTracker
              switchStage={switchStage}
              errand={errand}
              updateStage={stage => {
                if (authUserOwnsErrand || stage.key === 'transferred') return;

                toggleModal({
                  show: true,
                  component: (
                    <AsDialogBox
                      textOptions={{
                        text: `The poster will be informed of this update. You want to go ahead and update to '${stage?.key}'?`,
                      }}
                      noOptions={{
                        text: 'NOT YET',
                        onPress: () => toggleModal({show: false}),
                      }}
                      yesOptions={{
                        onPress: () => {
                          // navigation.navigate('Home');
                          toggleModal({show: false});
                          switchStage(stage);
                        },
                      }}
                    />
                  ),
                });
              }}
            />
          ) : (
            <DetailsOfErrand errand={errand} />
          )}
        </View>
      </ScrollView>
      {errand?.runner && (
        <>
          <GButton
            onPress={() =>
              navigation.navigate('Chatting', {
                data: {key: chatKey, errand},
              })
            }
            iconOptions={{icon: faMessage}}
            style={{bottom: 380, right: 25, backgroundColor: colors.red}}
            floating></GButton>
          <GButton
            onPress={() => setRunning(!running)}
            iconOptions={{icon: faFileLines}}
            style={{bottom: 310, right: 25}}
            floating></GButton>
        </>
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
      refreshYourPosts: fetchMyPosts,
      refreshNewsFeed: fetchNewsFeed,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewErrandScreen);
