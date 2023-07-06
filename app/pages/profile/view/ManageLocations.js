import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Toolbar from '../../../components/toolbar/Toolbar';
import {ScrollView} from 'react-native-gesture-handler';
import PageTitle from '../../../components/intros/PageTitle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisH, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../../styles';
import GBottomSheet from '../../../components/bottomsheet/GBottomSheet';
import {GetLocationComponent, SaveOrEditLocation} from './LocationStates';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';

const ManageLocations = () => {
  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === 'granted') {
        console.log('Location permission granted.');
        calculateLocation();
      } else {
        console.log('Location permission denied.');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };
  const calculateLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        Alert.alert(
          'Current Location',
          `Latitude: ${latitude}, Longitude: ${longitude}`,
        );
      },
      error => {
        // sometimes this is fired because location is off. Find a way to figure out when location is off, and when there is an actual error
        console.log('Error getting location:', error);
        Alert.alert('Error', 'Failed to retrieve location.');
      },
    );
  };
  return (
    <GBottomSheet
      // generics={{snapPoints: ['37%']}}
      generics={{snapPoints: ['23%']}}
      sheetContent={
        <GetLocationComponent onPress={requestLocationPermission} />
      }>
      <View>
        <Toolbar
          title="Your Locations"
          onBackPress={() => console.log('from locations')}
        />
        <ScrollView>
          <PageTitle
            title="Manage Locations"
            subtext="Edit your saved locations here to make posting & finding errands easier"
            v2
          />
          <View>
            {[2, 3, 4, 5, 3, 2].map((item, index) => (
              <View key={index?.toString()}>
                <LocationItem />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </GBottomSheet>
  );
};

const LocationItem = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderColor: '#D9D9D9',
      }}>
      <FontAwesomeIcon
        icon={faLocationDot}
        size={27}
        style={{marginRight: 20, opacity: 0.8}}
        color={colors.red}
      />
      <View>
        <Text style={{color: colors.black, fontSize: 18, fontWeight: '700'}}>
          My main house
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '93%',
            marginTop: 5,
          }}>
          <Text>1 month ago</Text>
          <Text
            style={{marginLeft: 'auto', fontWeight: '600', color: colors.red}}>
            {' '}
            Your delivery address
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{marginLeft: 'auto'}}>
        <FontAwesomeIcon icon={faEllipsisH} size={27} color={colors.red} />
      </TouchableOpacity>
    </View>
  );
};
export default ManageLocations;
