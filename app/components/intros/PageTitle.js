import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../styles';

const PageTitle = ({title, subtext}) => {
  // return <Text>Ogbemi my gee</Text>;
  return (
    <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
      <Text style={styles.title}>{title || 'Page Title'}</Text>
      <Text style={styles.subtext}>
        {subtext || 'Subtext is meant to be here...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
