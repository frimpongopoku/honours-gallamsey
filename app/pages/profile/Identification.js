import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import PageTitle from '../../components/intros/PageTitle';
import {faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import TextBox from '../../components/textbox/TextBox';
import GButton from '../../components/button/Button';
import GDropdown from '../../components/dropdown/Dropdown';
import GDatePicker from '../../components/datepicker/DatePicker';
const idTypes = [
  // {key: 'momo', label: 'Momo'},
  {key: 'passport', label: 'Passport'},
  {key: 'license', label: 'Drivers License'},
];
const Identification = ({onChange, form, getError}) => {
  return (
    <View>
      <ScrollView>
        <PageTitle
          iconOptions={{icon: faIdCard}}
          title="Identification"
          subtext="Its better if customers are sure you are human"
        />
        <View style={{paddingHorizontal: 20}}>
          <GDropdown
            label="Choose an identification type"
            value={form?.idType}
            onChange={onChange}
            name="idType"
            data={idTypes}
            labelExtractor={item => item.label}
            valueExtractor={item => item.key}
          />
          <TextBox
            value={form?.idNumber}
            onChange={onChange}
            name="idNumber"
            label="ID Number"
            placeholder="Enter your ID number..."
          />
          {/* <TextBox
          name = "passportId"
            label="Date of expiration (passport)"
            placeholder="When will your passport expire..."
          /> */}
          <GDatePicker
            value={form?.expiryDate}
            onChange={onChange}
            name="expiryDate"
          />
          {/* <TextBox
            label="Expiration Number"
            placeholder="When will your passport expire..."
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Identification;
