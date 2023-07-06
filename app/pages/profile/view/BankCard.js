import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../styles';

const BankCard = () => {
  return (
    <TouchableOpacity
      style={{
        padding: 20,
        height: 180,
        width: '100%',
        backgroundColor: '#382825',
        elevation: 15,
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <View>
        <Text
          style={{
            fontWeight: '600',
            color: colors.yellowish,
            fontSize: 18,
            opacity: 0.5,
          }}>
          10,345,219
        </Text>
        <Text style={{color: colors.yellowish, opacity: 0.3, fontSize: 10}}>
          TOTAL EARNED
        </Text>
      </View>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{marginLeft: 'auto'}}>
          <Text
            style={{
              color: colors.yellowish,
              opacity: 0.5,
              textAlign: 'right',
              fontSize: 11,
              fontWeight: '600',
            }}>
            GHS
          </Text>
          <Text
            style={{fontWeight: 'bold', color: colors.yellowish, fontSize: 40}}>
            568
          </Text>
          <Text
            style={{
              color: colors.yellowish,
              opacity: 0.3,
              textAlign: 'right',
              fontSize: 11,
            }}>
            BALANCE
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            fontWeight: '600',
            color: 'white',
            fontSize: 11,
            opacity: 0.8,
            // marginTop: 5,
          }}>
          WITHDRAWABLE IN 2 DAYS
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BankCard;
