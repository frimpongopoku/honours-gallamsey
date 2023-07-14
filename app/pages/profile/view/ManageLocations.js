import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
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
import GContextDropdown from '../../../components/dropdown/GContextDropdown';
import {MenuProvider} from 'react-native-popup-menu';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateUserLocationAction} from '../../../redux/actions/actions';

const ManageLocations = ({locations, updateLocationsInRedux}) => {
  const [saveLocation, setSaveLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({});
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
  console.log('lets see locations', locations);
  const calculateLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        Alert.alert(
          'Current Location',
          `Latitude: ${latitude}, Longitude: ${longitude}`,
        );
        setSaveLocation(true);
        setNewLocation({coords: [longitude, latitude]});
      },
      error => {
        // sometimes this is fired because location is off. Find a way to figure out when location is off, and when there is an actual error
        console.log('Error getting location:', error);
        Alert.alert('Error', 'Failed to retrieve location.');
      },
    );
  };

  const handleChange = obj => {
    setNewLocation({...newLocation, ...obj});
  };
  const addTheUpdates = () => {
    setSaveLocation(false);
    setNewLocation({});
    updateLocationsInRedux([newLocation, ...locations]);
  };

  const remove = index => {
    const rem = locations?.filter((item, i) => index !== i);
    console.log('this is the remainder', rem);
    updateLocationsInRedux(rem);
  };
  return (
    <GBottomSheet
      // generics={{snapPoints: ['37%']}}
      generics={{snapPoints: saveLocation ? ['37%'] : ['23%']}}
      sheetContent={
        saveLocation ? (
          <SaveOrEditLocation
            location={newLocation}
            onChange={handleChange}
            addLocation={addTheUpdates}
          />
        ) : (
          <GetLocationComponent onPress={requestLocationPermission} />
        )
      }>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
        }}>
        <Toolbar title="Your Locations" />
        <ScrollView>
          <PageTitle
            title="Manage Locations"
            subtext="Edit your saved locations here to make posting & finding errands easier"
            v2
          />

          <View>
            {!locations?.length && (
              <Text style={{width: '100%', textAlign: 'center'}}>
                No locations available yet
              </Text>
            )}
            {locations?.map((item, index) => (
              <View key={index?.toString()}>
                <LocationItem
                  location={item}
                  remove={remove}
                  locationId={index}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </GBottomSheet>
  );
};

const LocationItem = ({location, remove, locationId}) => {
  const options = {
    2: () => remove(locationId),
  };
  const handleOptions = (_, index) => {
    const fxn = options[index];
    console.log('FOUND FUNCATION', fxn, index);
    fxn && fxn(index);
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
          {location?.name || '...'}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '93%',
            marginTop: 5,
          }}>
          <Text>1 month ago</Text>
          {/* <Text
            style={{marginLeft: 'auto', fontWeight: '600', color: colors.red}}>
            {' '}
            Your delivery address
          </Text> */}
        </View>
      </View>
      <View style={{marginLeft: 'auto'}}>
        <GContextDropdown
          onItemSelected={handleOptions}
          data={['Set as default address', 'Edit', 'Remove']}>
          <FontAwesomeIcon icon={faEllipsisH} size={27} color={colors.red} />
        </GContextDropdown>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  locations: state.userLocations,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {updateLocationsInRedux: updateUserLocationAction},
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageLocations);
