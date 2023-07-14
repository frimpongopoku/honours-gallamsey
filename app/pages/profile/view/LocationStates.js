import {View, Text} from 'react-native';
import React from 'react';
import PageTitle from '../../../components/intros/PageTitle';
import GButton from '../../../components/button/Button';
import TextBox from '../../../components/textbox/TextBox';

export const GetLocationComponent = ({onPress}) => {
  return (
    <View>
      <PageTitle
        v2
        title="Current Location"
        subtext="Calculate and save my current location"
      />
      <GButton onPress={onPress} variant="green">
        GET MY CURRENT LOCATION
      </GButton>
    </View>
  );
};
export const SaveOrEditLocation = ({location, onChange, addLocation}) => {
  return (
    <View>
      <PageTitle
        v2
        title="Save/Edit Location"
        subtext="We have your current coordinates, want to save it?"
      />
      {/* <View style={{display: 'flex', flexDirection: 'row'}}> */}
      <TextBox
        value={location?.name}
        name="name"
        onChange={onChange}
        containerStyle={{marginTop: 10}}
        label="What should the name be?"
        placeholder="Enter it here..."
      />
      <GButton onPress={addLocation} variant="green">
        SAVE
      </GButton>
      {/* </View> */}
    </View>
  );
};
