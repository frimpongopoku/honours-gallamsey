import {View, Text, ScrollView} from 'react-native';
import React from 'react';

import TextBox from '../../components/textbox/TextBox';
import GDropdown from '../../components/dropdown/Dropdown';
import PageTitle from '../../components/intros/PageTitle';
import {bindActionCreators} from 'redux';
import {updateErrandFormAction} from '../../redux/actions/actions';
import {connect} from 'react-redux';
import {colors} from '../../styles';

const FirstStage = ({setForm, form, getError, userLocations}) => {
  const onChange = obj => {
    setForm({...form, ...obj});
  };

  return (
    <View>
      <ScrollView>
        <PageTitle
          title="Details"
          subtext="Add detailed instructions to ensure you get what you want"
          v2
        />
        <View style={{paddingHorizontal: 10}}>
          <TextBox
            name="title"
            onChange={onChange}
            value={form?.title}
            label="Title"
            placeholder="Enter a title"
          />
          <TextBox
            name="description"
            onChange={onChange}
            value={form?.description}
            label="Description"
            placeholder="Enter a description"
            textarea
          />

          <GDropdown
            data={userLocations || []}
            labelExtractor={loc => loc.name}
            valueExtractor={loc => loc.coords}
            name="deliveryLocation"
            onChange={onChange}
            value={form?.deliveryLocation}
            label="Select Delivery Destination"
            placeholder=" Choose a delivery destination">
            <Text style={{marginTop: 5, color: colors.black, fontSize: 12}}>
              Select from the list of locations you have saved
            </Text>
          </GDropdown>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {form: state.errandForm, userLocations: state.userLocations};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({setForm: updateErrandFormAction}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FirstStage);
