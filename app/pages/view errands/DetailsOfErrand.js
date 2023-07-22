import {View, Text} from 'react-native';
import React from 'react';
import Paragraph from '../../components/paragraph/Paragraph';
import {colors} from '../../styles';
const DetailsOfErrand = ({errand}) => {
  const {cost, reward, description, poster} = errand || {};
  return (
    <View>
      <Paragraph>
        You need GHS {cost} GHS to run this errand, you will earn GHS {reward}{' '}
        when complete. So at the end of the errand you will walk away with a
        total of GHS {cost + reward}.
      </Paragraph>

      <View>
        <Text
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: colors.red,
            fontWeight: 'bold',
            color: 'white',
          }}>
          JOB INSTRUCTIONS
        </Text>
        <Paragraph>{description || '...'}</Paragraph>
      </View>

      <View>
        <Text
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: colors.red,
            fontWeight: 'bold',
            color: 'white',
          }}>
          POSTER'S DETAILS
        </Text>
        <View style={{padding: 15}}>
          <View>
            <Text style={{color: colors.black, marginBottom: 5}}>
              Full Name
            </Text>
            <Text
              style={{
                fontWeight: '600',
                color: colors.black,
                fontSize: 18,
                marginBottom: 5,
              }}>
              {poster?.name}
            </Text>
          </View>
          <View>
            <Text style={{color: colors.black, marginBottom: 5}}>Whatsapp</Text>
            <Text
              style={{
                fontWeight: '600',
                color: colors.black,
                fontSize: 18,
                marginBottom: 5,
              }}>
              {poster?.phone}
            </Text>
          </View>
          <View>
            <Text style={{color: colors.black, marginBottom: 5}}>
              Phone Number
            </Text>
            <Text
              style={{
                fontWeight: '600',
                color: colors.black,
                fontSize: 18,
                marginBottom: 5,
              }}>
              {poster?.phone}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsOfErrand;
