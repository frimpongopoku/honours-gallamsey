import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';

const GSwitch = ({label}) => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggleChange = value => {
    setToggleValue(value);
  };

  return (
    <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
      <Text
        style={{
          color: 'black',
          fontWeight: '500',
          fontSize: 16,
          color: toggleValue ? 'red' : 'black',
        }}>
        {label || 'Enter toggle label...'}
      </Text>
      <Switch
        value={toggleValue}
        onValueChange={handleToggleChange}
        style={{marginLeft: 'auto'}}
      />
    </View>
  );
};

export default GSwitch;
