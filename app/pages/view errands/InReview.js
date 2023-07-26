import {View, Text} from 'react-native';
import React from 'react';
import {smartString} from '../../utils';
import {colors} from '../../styles';
import GButton from '../../components/button/Button';

const InReview = ({errand, ownsThis, sendFunds}) => {
  return (
    <View>
      <View style={{marginHorizontal: 30, marginBottom: 15}}>
        <Text style={{color: colors.black, fontWeight: '700', fontSize: 24}}>
          {smartString(errand?.title, 28)}
        </Text>
        <Text style={{color: colors.green, fontWeight: '700', fontSize: 22}}>
          GHS {errand?.reward + errand?.cost}
        </Text>
        <Text style={{color: colors.red, fontWeight: '600', fontSize: 18}}>
          IS BEING REVIEWED
        </Text>

        <Text style={{color: 'black', marginTop: 10}}>
          The poster, has submitted this for review. The Gallamsey resolution
          team will get to this and contact both parties as soon as possible.
        </Text>
      </View>

      {ownsThis && (
        <GButton onPress={sendFunds} variant="black">
          STOP REVIEW, JUST SEND FUNDS
        </GButton>
      )}
    </View>
  );
};

export default InReview;
