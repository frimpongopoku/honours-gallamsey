import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../styles';
import {bindActionCreators} from 'redux';
import {toggleUniversalModal} from '../../../redux/actions/actions';
import {connect} from 'react-redux';
import AsDialogBox from '../../../components/modal/AsDialogBox';
import WIthIconAndText from '../../../components/modal/WIthIconAndText';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const BankCard = ({toggleModal, user}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        toggleModal({
          show: true,
          component: (
            <AsDialogBox
              textOptions={{text: 'Would you like to cashout or Cash In'}}
              noOptions={{
                text: 'CASH IN',
                onPress: () => {
                  toggleModal({show: false});
                  navigation.navigate('CashInOrOut', {data: 'cashin'});
                },
              }}
              yesOptions={{
                text: 'CASH OUT',
                onPress: () => {
                  toggleModal({show: false});
                  navigation.navigate('CashInOrOut', {data: 'cashout'});
                  // toggleModal({
                  //   component: (
                  //     <WIthIconAndText
                  //       textOptions={{
                  //         text: 'Congratulations! An amount of 568 has been sent to your default mobile wallet, enjoy!',
                  //       }}
                  //       iconOptions={{icon: faCheckCircle, color: colors.green}}
                  //     />
                  //   ),
                  // });
                },
              }}
            />
          ),
        })
      }
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
            {user?.wallet?.balance}
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleModal: toggleUniversalModal,
    },
    dispatch,
  );
};
export default connect(null, mapDispatchToProps)(BankCard);
