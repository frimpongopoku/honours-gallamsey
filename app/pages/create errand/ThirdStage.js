import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import TextBox from '../../components/textbox/TextBox';
import PageTitle from '../../components/intros/PageTitle';
import {colors} from '../../styles';
import GButton from '../../components/button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {
  sendErrandsToBackend,
  updateErrandFormAction,
} from '../../redux/actions/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getError} from '../../utils';

const ThirdStage = ({setForm, form, errors, saveNewErrand}) => {
  const onChange = obj => {
    setForm({...form, ...obj});
  };

  const createNewErrand = () => {
    saveNewErrand(form, {allErrors: errors}, response =>
      console.log('RESPONSE AFTER CREATING', response),
    );
  };

  const costError = getError('cost', errors?.errandForm || {});
  const compError = getError('reward', errors?.errandForm || {});
  return (
    <View style={{height: '100%'}}>
      <ScrollView>
        <PageTitle
          title="Cost Estimation"
          subtext="Indicate how much it would take for the errand & add compensation"
          v2
        />
        <View style={{marginHorizontal: 10}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 24,
              marginHorizontal: 10,
              color: colors.green,
            }}>
            Current Balance: GHS 880
          </Text>
          <TextBox
            labelStyle={costError?.labelStyle}
            style={costError?.inputStyle}
            name="cost"
            onChange={onChange}
            value={form?.cost}
            label={costError?.message || 'Cost of errand'}
            generics={{keyboardType: 'numeric'}}
            placeholder="How much will everything in the errand cost...">
            <Text style={{marginTop: 5, color: colors.black, fontSize: 12}}>
              How much will it take to complete your errand? Please indicate the
              right amount. Runners may not pick up errand if amount is
              unrealistic...
            </Text>
          </TextBox>
          <TextBox
            labelStyle={compError?.labelStyle}
            style={compError?.inputStyle}
            name="reward"
            onChange={onChange}
            value={form?.reward}
            label={compError?.message || 'Compensation Amount'}
            generics={{keyboardType: 'numeric'}}
            placeholder="Amount for runner...">
            <Text style={{marginTop: 5, color: colors.black, fontSize: 12}}>
              How much are you willing to give whoever run's this errand. Amount
              should be more than GHS10
            </Text>
          </TextBox>

          <Text
            style={{
              fontWeight: '700',
              fontSize: 18,
              marginHorizontal: 10,
              color: colors.red,
            }}>
            Amount Payable: GHS 80
          </Text>
        </View>
      </ScrollView>
      <GButton
        onPress={createNewErrand}
        onClick
        iconOptions={{icon: faCheck}}
        floating
      />
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 100,
          right: 20,
          padding: 15,
          borderRadius: 55,
          backgroundColor: colors.green,
          elevation: 15,
        }}>
        <FontAwesomeIcon icon={faCheck} color="white" size={28} />
      </TouchableOpacity> */}
    </View>
  );
};

const mapStateToProps = state => {
  return {form: state.errandForm, errors: state.errors};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setForm: updateErrandFormAction,
      saveNewErrand: sendErrandsToBackend,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ThirdStage);
