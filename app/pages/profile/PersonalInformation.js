import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import PageTitle from '../../components/intros/PageTitle';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import TextBox from '../../components/textbox/TextBox';
import GButton from '../../components/button/Button';
import {getError} from '../../utils';

const PersonalInformation = ({onChange, form, errors}) => {
  const preferredNameError = getError('preferredName', errors);
  const lastNameError = getError('lastName', errors);
  const firstNameError = getError('firstName', errors);
  // const preferredNameError = getError("preferredName", errors)

  return (
    <View>
      <ScrollView>
        <PageTitle
          iconOptions={{icon: faUser}}
          title="Personal Information"
          subtext="We feel safe when we know you"
        />
        <View style={{paddingHorizontal: 20}}>
          <TextBox
            name="preferredName"
            onChange={onChange}
            value={form?.preferredName}
            labelStyle={preferredNameError.labelStyle}
            style={preferredNameError.style}
            label={preferredNameError.message || 'Preferred Name'}
            placeholder="What should users call you..."
          />
          <TextBox
            name="firstName"
            onChange={onChange}
            value={form?.firstName}
            labelStyle={firstNameError.labelStyle}
            style={firstNameError.style}
            label={firstNameError.message || 'First Name'}
            placeholder="What's your first name..."
          />
          <TextBox
            name="lastName"
            onChange={onChange}
            value={form?.lastName}
            labelStyle={lastNameError.labelStyle}
            style={lastNameError.style}
            label={lastNameError.message || 'Last Name'}
            placeholder="What's your last name..."
          />
          <TextBox
            name="phone"
            onChange={onChange}
            value={form.phone}
            generics={{keyboardType: 'phone-pad'}}
            label="Phone Number"
            placeholder="Your phone number..."
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalInformation;
