import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

const PageTitle = props => {
  const {title, subtext, iconOptions, v2} = props;

  if (v2) return <Version2 {...props} />;
  // return <Text>Ogbemi my gee</Text>;
  return (
    <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
      {iconOptions && (
        <View style={styles.iconBox}>
          <FontAwesomeIcon
            icon={iconOptions.icon || faHome}
            color={iconOptions.color || colors.red}
            size={32}
          />
        </View>
      )}
      <Text style={styles.title}>{title || 'Page Title'}</Text>
      <Text style={styles.subtext}>
        {subtext}
      </Text>
    </View>
  );
};

const Version2 = ({title, subtext}) => {
  return (
    <View style={{display: 'flex', paddingVertical: 20, paddingHorizontal: 20}}>
      <Text
        style={{
          color: colors.black,
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 6,
        }}>
        {title || 'Page Title'}
      </Text>
      <Text style={{fontWeight: '500', color: colors.black}}>
        {subtext || 'Subtext is meant to be here...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBox: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 100,
    borderColor: colors.red,
    marginVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.red,
    marginBottom: 6,
  },
  subtext: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
});

export default PageTitle;
