import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../../styles';
import Paragraph from '../../components/paragraph/Paragraph';
import GButton from '../../components/button/Button';
import {ScrollView} from 'react-native-gesture-handler';
import TextBox from '../../components/textbox/TextBox';

const DenyTransfer = () => {
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 30, paddingTop: 10}}>
        <Text style={{color: colors.black, fontWeight: '700', fontSize: 24}}>
          Deny Transfer
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
          Please explain why you do not approve the transfer of the funds to
          Akwesi Frimpong
        </Paragraph>
        <TextBox
          generics={{numberOfLines: 11}}
          label="What happened?"
          containerStyle={{padding: 0, marginBottom: 20}}
          textarea
          placeholder="Narrate your situation..."
        />
      </View>

      <GButton variant="green">RUN THIS</GButton>
    </ScrollView>
  );
};

export default DenyTransfer;
