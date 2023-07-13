import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  UIManager,
  findNodeHandle,
} from 'react-native';
const BUTTONS = ['Option 1', 'Option 2', 'Option 3', 'Cancel'];

const GContextDropdown = ({children, onItemSelected, data}) => {
  const showContextMenu = () => {
    UIManager.showPopupMenu(
      findNodeHandle(buttonRef.current),
      data || BUTTONS,
      () => {},
      (result, index) => {
        if (result === 'itemSelected') {
          onItemSelected((data || [])[index]);
          // handleOptionSelect(index);
        }
      },
    );
  };

  const handleOptionSelect = index => {
    switch (index) {
      case 0:
        // Handle Option 1
        break;
      case 1:
        // Handle Option 2
        break;
      case 2:
        // Handle Option 3
        break;
      default:
        break;
    }
  };

  const buttonRef = React.useRef(null);

  return (
    <View>
      {/* Your content */}
      <TouchableOpacity ref={buttonRef} onPress={showContextMenu}>
        {children || <Text>Open Context Menu</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default GContextDropdown;

// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import {
//   Menu,
//   MenuOption,
//   MenuOptions,
//   MenuTrigger,
// } from 'react-native-popup-menu';

// const GContextDropdown = ({children}) => {
//   const handleOptionSelect = option => {
//     // Handle the selected option
//     console.log(option);
//   };

//   return (
//     <View>
//       {children}

//       <Menu>
//         <MenuTrigger>
//           <TouchableOpacity>
//             <Text>Open Context Menu</Text>
//           </TouchableOpacity>
//         </MenuTrigger>
//         <MenuOptions>
//           <MenuOption onSelect={() => handleOptionSelect('Option 1')}>
//             <Text>Option 1</Text>
//           </MenuOption>
//           <MenuOption onSelect={() => handleOptionSelect('Option 2')}>
//             <Text>Option 2</Text>
//           </MenuOption>
//           <MenuOption onSelect={() => handleOptionSelect('Option 3')}>
//             <Text>Option 3</Text>
//           </MenuOption>
//         </MenuOptions>
//       </Menu>
//     </View>
//   );
// };

// export default GContextDropdown;
