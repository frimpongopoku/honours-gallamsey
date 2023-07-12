import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors} from '../../styles';
import GButton from '../button/Button';

const GDatePicker = ({generics, value, onChange, name}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
      onChange && onChange({[name]: selected});
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const formattedDate = selectedDate
    ? selectedDate.toDateString()
    : 'Select a date';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date</Text>
      <GButton
        style={styles.button}
        textStyle={{color: colors.black}}
        rippleColor={colors.red}
        onPress={showDatePickerModal}>
        {formattedDate || 'Pick a date'}
      </GButton>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date(2023, 0, 1)}
          {...(generics || {})}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    marginBottom: 4,
    marginTop: 10,
    borderColor: colors.black,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.black,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default GDatePicker;
