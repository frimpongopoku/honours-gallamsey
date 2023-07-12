import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toolbar from '../../components/toolbar/Toolbar';
import TabView from '../../components/tabs/TabView';
import {faCamera, faPen, faPiggyBank} from '@fortawesome/free-solid-svg-icons';
import SecondStage from './SecondStage';
import ThirdStage from './ThirdStage';
import FirstStage from './FirstStage';
import {fetchHeights} from '../../utils';
import {bindActionCreators} from 'redux';
import {updateErrandFormAction} from '../../redux/actions/actions';
import {connect} from 'react-redux';

const CreateErrandScreen = ({form, setForm}) => {
  // const [form, setForm] = useState({});
  const [currentTab, setCurrentTab] = useState({});
  const {aboveBottomNav} = fetchHeights();
  const [errors, setErrors] = useState({});

  const handleInput = changeObject => {
    console.log('Form before adding', form);
    // console.log('What is coming here', changeObject);
    setForm({...form, ...changeObject});
  };
  const getError = name => {
    const {labelStyle, inputStyle} = errorStyles;
    const message = errors[name];
    if (!message) return {};
    return {message, labelStyle, inputStyle};
  };

  const props = {
    onChange: handleInput,
    form,
    getError,
  };

  const TABS = [
    {
      key: 'description',
      name: 'Description',
      title: 'Create New Errand',
      icon: faPen,
      component: <FirstStage {...props} />,
    },
    {
      key: 'images',
      name: 'images',
      title: 'Add Images',
      icon: faCamera,
      component: <SecondStage {...props} />,
    },
    {
      key: 'cost',
      name: 'cost',
      title: 'Estimate Cost & Pay',
      icon: faPiggyBank,
      component: <ThirdStage {...props} />,
    },
  ];

  console.log('THIS IS THE FORM', form);
  return (
    <SafeAreaView>
      <View
        style={{
          height: aboveBottomNav,
          backgroundColor: 'white',
        }}>
        <Toolbar title={currentTab?.title || 'Create New Errand'} />

        <TabView
          pages={TABS}
          activeKey="description"
          notifyOnChange={tab => setCurrentTab(tab)}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {form: state.errandForm};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({setForm: updateErrandFormAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateErrandScreen);
