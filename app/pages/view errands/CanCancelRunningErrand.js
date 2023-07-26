import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../../styles';
import Paragraph from '../../components/paragraph/Paragraph';
import GButton from '../../components/button/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {itsBeenMoreThan30Minutes} from '../../utils';

const CanCancelRunningErrand = ({cancel, done, ownsThis, runner, errand}) => {
  const isComplete = errand?.status === 'complete';

  const now = new Date();
  const timeIsUp = itsBeenMoreThan30Minutes(now, errand?.completedAt);
  console.log('whats this ', timeIsUp, now, errand.completedAt);
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 30, paddingTop: 10}}>
        <Text style={{color: colors.black, fontWeight: '700', fontSize: 24}}>
          A New Pair of Shoes
        </Text>
        <Text style={{color: colors.green, fontWeight: '700', fontSize: 22}}>
          GHS 175
        </Text>
        <Paragraph
          style={{
            color: colors.black,
            padding: 0,
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 18,
            marginVertical: 12,
          }}>
          {!ownsThis
            ? isComplete // replace with isComplete
              ? 'Your job is done! If you dont get a response from the poster in 30 mins, you can forcefully claim your funds'
              : 'Please pay close attention to the instructions listed on the errand. Unsatisfied users may result in you not getting payed.'
            : 'You will receive updates from the runnner in real time as they update stages on this page!'}
        </Paragraph>
      </View>
      {!ownsThis ? (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {isComplete ? ( // replacewith isComplete
            <GButton
              disabled={!timeIsUp}
              onPress={cancel}
              variant="green"
              style={{flex: 1}}>
              TAKE FUNDS NOW
            </GButton>
          ) : (
            <GButton
              disabled={isComplete}
              onPress={cancel}
              variant="red"
              style={{flex: 1}}>
              CANCEL
            </GButton>
          )}
          {/* <GButton
            disabled={!isComplete}
            onPress={done}
            variant="green"
            style={{flex: 1}}>
            REQUEST FUNDS
          </GButton> */}
        </View>
      ) : (
        <View>
          {isComplete ? ( // replace with isComplete
            <View>
              <Text
                style={{
                  paddingHorizontal: 30,
                  paddingBottom: 5,
                  fontWeight: 'bold',
                  color: colors.green,
                }}>
                {runner?.name} is done, send him the funds!
              </Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <GButton variant="red" style={{flex: 1}} disabled={timeIsUp}>
                  REQUEST REVIEW
                </GButton>
                <GButton variant="green" style={{flex: 1}} disabled={timeIsUp}>
                  SEND FUNDS
                </GButton>
              </View>
            </View>
          ) : (
            <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
              <Text
                style={{fontWeight: '600', fontSize: 16, color: colors.green}}>
                Sit back and relax, {runner?.name || '...'} is working!
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default CanCancelRunningErrand;
