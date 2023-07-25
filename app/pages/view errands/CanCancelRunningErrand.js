import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../../styles';
import Paragraph from '../../components/paragraph/Paragraph';
import GButton from '../../components/button/Button';
import {ScrollView} from 'react-native-gesture-handler';

const CanCancelRunningErrand = ({cancel, done, ownsThis, runner, errand}) => {
  const isComplete = errand?.status === 'complete';
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
          Please pay close attention to the instructions listed on the errand.
          Unsatisfied users may result in you not getting payed.
        </Paragraph>
      </View>
      {!ownsThis ? (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <GButton
            disabled={isComplete}
            onPress={cancel}
            variant="red"
            style={{flex: 1}}>
            CANCEL
          </GButton>
          <GButton
            disabled={!isComplete}
            onPress={done}
            variant="green"
            style={{flex: 1}}>
            REQUEST FUNDS
          </GButton>
        </View>
      ) : (
        <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
          <Text style={{fontWeight: '600', fontSize: 16, color: colors.green}}>
            Sit back and relax, {runner?.name || '...'} is working!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CanCancelRunningErrand;
