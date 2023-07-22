import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../../styles';
import Paragraph from '../../components/paragraph/Paragraph';
import GButton from '../../components/button/Button';
import {ScrollView} from 'react-native-gesture-handler';

const AboutToPickErrand = ({pickErrand, errand}) => {
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 30, paddingTop: 10}}>
        <Text style={{color: colors.black, fontWeight: '700', fontSize: 21}}>
          {errand?.title}
        </Text>
        <Text style={{color: colors.green, fontWeight: '700', fontSize: 22}}>
          GHS {errand?.reward + errand?.cost}
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
      <GButton onPress={pickErrand} variant="green">
        RUN THIS
      </GButton>
    </ScrollView>
  );
};

export default AboutToPickErrand;
