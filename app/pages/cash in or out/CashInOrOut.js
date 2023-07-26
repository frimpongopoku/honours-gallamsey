import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import PageTitle from '../../components/intros/PageTitle';
import TextBox from '../../components/textbox/TextBox';
import GButton from '../../components/button/Button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {colors} from '../../styles';
import {
  setGallamseyUser,
  toggleUniversalModal,
} from '../../redux/actions/actions';
import AsDialogBox from '../../components/modal/AsDialogBox';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import WIthIconAndText from '../../components/modal/WIthIconAndText';
import {apiCall} from '../../api/messenger';
import {UPDATE_USER_URL} from '../../api/urls';

const CashInOrOut = ({route, user, toggleModal, updateUserInRedux}) => {
  const wallet = user?.wallet || {};
  const [amount, setAmount] = useState(0);
  const value = route.params?.data || 'cashin';
  const modes = {
    cashin: {
      title: 'Cash In',
      subtext: 'Easily add funds to your wallet to your wallet here',
      placeholder: 'Enter cash in amount...',
      btn: 'CASH IN',
      label: 'Enter the amount you would like to add to your wallet',
    },
    cashout: {
      title: 'Cash Out',
      placeholder: 'Enter amount to cashout...',
      btn: 'CASH OUT',
      label: 'Enter the amount you would like to retrieve',
      subtext: 'Retrieve any amount within your current wallet balance',
    },
  };

  const updateOnBackend = (data, cb) => {
    apiCall(
      UPDATE_USER_URL,
      {
        body: {id: user?._id, wallet: {...wallet, ...data}},
      },
      response => {
        console.log('RESPONSE ON CASHINOUT PAGE', response);
        if (!response.success)
          return console.log('Error on CashInOut Page: ', response.error);
        updateUserInRedux(response.data);
        cb && cb();
      },
    );
  };

  const takeAction = () => {
    if (!amount) return;

    const options = {
      cashin: {
        text: `An amount of GHS ${amount} will be retrieved from your MOMO account into your Gallamsey app wallet. Are you sure?`,
        congratulations: `Congratulations! An amount of GHS ${amount}  has now been deposited into your Gallamsey wallet, enjoy!`,
        newBalance: {balance: (wallet?.balance || 0) + Number(amount)},
      },
      cashout: {
        text: `An amount of GHS ${amount} will be sent from your Gallamsey wallet into your MOMO account. Are you sure?`,
        congratulations: `Congratulations! An amount of GHS ${amount}  has now been deposited into your MOMO acount, enjoy!`,
        newBalance: {balance: (wallet?.balance || 0) - Number(amount)},
      },
    };

    const option = options[value];
    console.log('thats the options man', option);
    toggleModal({
      show: true,
      component: (
        <AsDialogBox
          textOptions={{
            text: option?.text,
          }}
          iconOptions={{icon: faCheckCircle, color: colors.green}}
          noOptions={{
            text: 'NO',
            onPress: () => {
              toggleModal({show: false});
              // navigation.navigate('CashInOrOut', {data: 'cashin'});
            },
          }}
          yesOptions={{
            text: 'YES, GO AHEAD',
            onPress: () => {
              // toggleModal({show: false});
              // navigation.navigate('CashInOrOut', {data: 'cashout'});
              updateOnBackend(option?.newBalance, () => {
                toggleModal({
                  show: true,
                  component: (
                    <WIthIconAndText
                      textOptions={{
                        text: option?.congratulations,
                      }}
                      iconOptions={{icon: faCheckCircle, color: colors.green}}
                    />
                  ),
                });
                setAmount('');
              });
            },
          }}
        />
      ),
    });
  };

  const mode = modes[value];
  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <Toolbar title={mode.title} />
      <PageTitle title={mode.title} subtext={mode.subtext} v2 />
      <View style={{padding: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: colors.green,
            fontSize: 28,
            marginBottom: 10,
          }}>
          Current Balance - GHS {user?.wallet?.balance}
        </Text>
        <TextBox
          name="amount"
          onChange={obj => {
            setAmount(obj.amount);
          }}
          value={amount}
          label={mode.label}
          placeholder={mode.placeholder}
          containerStyle={{padding: 0, marginBottom: 10}}
          generics={{keyboardType: 'numeric'}}
        />
        <GButton onPress={() => takeAction()}>{mode?.btn}</GButton>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleModal: toggleUniversalModal,
      updateUserInRedux: setGallamseyUser,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(CashInOrOut);
