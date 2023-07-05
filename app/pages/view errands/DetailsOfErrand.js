import {View, Text} from 'react-native';
import React from 'react';
import Paragraph from '../../components/paragraph/Paragraph';
import {colors} from '../../styles';
const DetailsOfErrand = () => {
  return (
    <View>
      <Paragraph>
        You need GHS 150 GHS to run this errand, you will earn GHS 25 when
        complete. So at the end of the errand you will walk away with a total of
        GHS 175.
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
        <Paragraph>
          1. Please make sure its the color RED 2. Check the bottom and see it
          has "Guuci" 3. Make sure it has the color blue 4. Please do a litmus
          paper test 5. Make sure its sealed before delivery 1. Please make sure
          its the color RED 2. Check the bottom and see it has "Guuci" 3. Make
          sure it has the color blue 4. Please do a litmus paper test 5. Make
          sure its sealed before delivery
        </Paragraph>
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
              Desmond Elliot
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
              +230 4637 387 32
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
              +230 4637 387 32
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
              +230 4637 387 32
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
              +230 4637 387 32
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsOfErrand;
