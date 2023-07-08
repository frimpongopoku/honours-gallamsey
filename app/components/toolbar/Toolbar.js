import {
  faBackward,
  faBell,
  faEllipsis,
  faLongArrowLeft,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {colors} from '../../styles';
import {useNavigation} from '@react-navigation/native';

const Toolbar = props => {
  const {title, onBackPress, options, v2} = props;
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) return onBackPress();
    navigation.goBack();
  };
  if (v2) {
    return <ToolbarWithoutBack {...props} onBackPress={handleBack} />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <FontAwesomeIcon size={22} icon={faLongArrowLeft} color={colors.red} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
      {options && (
        <TouchableOpacity onPress={onBackPress} style={{marginLeft: 'auto'}}>
          <FontAwesomeIcon size={22} icon={faEllipsis} color={colors.red} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const ToolbarWithoutBack = ({title, onNotification, onUserPress}) => {
  return (
    <View style={styles.container}>
      <Text style={{...styles.title, textAlign: 'left'}}>{title}</Text>

      <View style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row'}}>
        <TouchableOpacity onPress={onNotification} style={{marginRight: 20}}>
          <FontAwesomeIcon icon={faBell} size={22} color={colors.red} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onUserPress} style={{marginRight: 5}}>
          <FontAwesomeIcon icon={faUser} size={22} color={colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: colors.red,
    elevation: 10,
  },
  backButton: {
    color: colors.red,
    fontSize: 16,
    marginRight: 16,
  },
  title: {
    flex: 1,
    color: colors.red,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Toolbar;
