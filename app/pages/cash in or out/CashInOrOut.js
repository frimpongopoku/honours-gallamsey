import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import PageTitle from '../../components/intros/PageTitle';
import TextBox from '../../components/textbox/TextBox';
import GButton from '../../components/button/Button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {colors} from '../../styles';
import {toggleUniversalModal} from '../../redux/actions/actions';

const CashInOrOut = ({route, user, toggleModal}) => {
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

  const takeAction = (value)=>{ 

  }

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
        <GButton>{mode?.btn}</GButton>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({user: state.user});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleModal: toggleUniversalModal,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(CashInOrOut);
