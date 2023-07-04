import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import TextBox from '../../components/textbox/TextBox';
import PageTitle from '../../components/intros/PageTitle';
import {colors} from '../../styles';
import GButton from '../../components/button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const ThirdStage = () => {
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
            label="Cost of errand"
            generics={{keyboardType: 'numeric'}}
            placeholder="How much will everything in the errand cost...">
            <Text style={{marginTop: 5, color: colors.black, fontSize: 12}}>
              How much will it take to complete your errand? Please indicate the
              right amount. Runners may not pick up errand if amount is
              unrealistic...
            </Text>
          </TextBox>
          <TextBox
            label="Compensation Amount "
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
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};

export default ThirdStage;
