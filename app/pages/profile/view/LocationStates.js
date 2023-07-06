import {View, Text} from 'react-native';
import React from 'react';
import PageTitle from '../../../components/intros/PageTitle';
import GButton from '../../../components/button/Button';
import TextBox from '../../../components/textbox/TextBox';

export const GetLocationComponent = () => {
  return (
    <View>
      <PageTitle
        v2
        title="Current Location"
        subtext="Calculate and save my current location"
      />
      <GButton variant="green"> GET MY CURRENT LOCATION</GButton>
    </View>
  );
};
export const SaveOrEditLocation = () => {
  return (
    <View>
      <PageTitle
        v2
        title="Save/Edit Location"
        subtext="We have your current coordinates, want to save it?"
      />
      {/* <View style={{display: 'flex', flexDirection: 'row'}}> */}
      <TextBox
        containerStyle={{marginTop: 10}}
        label="What should the name be?"
        placeholder="Enter it here..."
      />
      <GButton variant="green">SAVE</GButton>
      {/* </View> */}
    </View>
  );
};
