import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {colors} from '../../styles';
const GDropdown = ({label = 'Select an option', placeholder}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = itemValue => {
    setSelectedValue(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedValue}
          placeholder={placeholder || 'Choose an item'}
          // style={styles.dropdown}
          onValueChange={handleValueChange}>
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <Picker.Item
                // style={{fontWeight: 'bold', color: 'red'}}
                key={index?.toString()}
                label={item.toString()}
                value={item.toString()}
              />
            );
          })}

          {/* <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" /> */}
        </Picker>
      </View>
      {/* <Text style={styles.selectedValue}>{selectedValue}</Text> */}
    </View>
  );
};
// const PickerItem = ({label}) => {
//   return (
//     <View>
//       <Text style={styles.pickerItemText}>{label}</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: colors.black,
  },
  dropdown: {
    // height: 40,
    // borderColor: 'gray',
    borderWidth: 2,
    borderColor: colors.black,
    // borderWidth: 1,
  },
  pickerItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },

  selectedValue: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GDropdown;
