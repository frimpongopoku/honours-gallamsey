import {View, Text, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';

const GSwitch = ({label, onChange, value}) => {
  const [toggleValue, setToggleValue] = useState(value);

  useEffect(() => {
    setToggleValue(value);
  }, [value]);

  const handleToggleChange = value => {
    onChange && onChange(value);
    // setToggleValue(value);
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
