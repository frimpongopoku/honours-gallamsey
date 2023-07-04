import {View, Text, ScrollView} from 'react-native';
import React from 'react';

import TextBox from '../../components/textbox/TextBox';
import GDropdown from '../../components/dropdown/Dropdown';
import PageTitle from '../../components/intros/PageTitle';

const FirstStage = () => {
  return (
    <View>
      <ScrollView>
        <PageTitle
          title="Details"
          subtext="Add detailed instructions to ensure you get what you want"
          v2
        />
        <View style={{paddingHorizontal: 10}}>
          <TextBox label="Title" placeholder="Enter a title" />
          <TextBox
            label="Description"
            placeholder="Enter a description"
            textarea
          />

          <GDropdown
            label="Select Delivery Destination"
            placeholder=" Choose a delivery destination"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FirstStage;
