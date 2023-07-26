import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import Toolbar from '../../../components/toolbar/Toolbar';

import ImagePro from '../../../components/image/ImagePro';
import {colors} from '../../../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEllipsisH,
  faEnvelope,
  faLocation,
  faLocationPin,
  faMapLocation,
  faMapLocationDot,
  faMapPin,
  faPen,
  faPencil,
  faPhone,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import BankCard from './BankCard';
import GContextDropdown from '../../../components/dropdown/GContextDropdown';
import {bindActionCreators} from 'redux';
import {
  findUserProfile,
  firebaseSignOutAction,
} from '../../../redux/actions/actions';
import {connect} from 'react-redux';

const ViewProfileScreen = ({
  navigation,
  signOutFromFirebase,
  user,
  refreshProfile,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const signOut = () => {
    signOutFromFirebase();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    refreshProfile(user?.email, response => {
      console.log('REFRESHING FROM PROFILE PAGE', response);
      setRefreshing(false);
    });
  };

  return (
    <SafeAreaView>
      <Toolbar
        title="Profile"
        options={
          <GContextDropdown
            data={['Signout']}
            onItemSelected={selected =>
              selected?.toLowerCase() === 'signout' && signOut()
            }>
            <FontAwesomeIcon size={22} color={colors.red} icon={faEllipsisH} />
          </GContextDropdown>
        }
      />
      <ScrollView
        style={{padding: 20, height: '100%', backgroundColor: 'white'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: 100, position: 'relative'}}>
            <ImagePro
              imageUrl={user?.image || 'https://i.pravatar.cc/300'}
              style={{
                height: 100,
                width: 100,
                borderRadius: 500,
                borderWidth: 3,
                borderColor: '#FF5733',
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangeProfilePhoto')}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'white',
                borderRadius: 55,
              }}>
              <FontAwesomeIcon icon={faPlusCircle} size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{display: 'flex', alignItems: 'center', paddingVertical: 10}}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 22,
              color: colors.black,
              marginBottom: 5,
            }}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={{fontWeight: '500', fontSize: 16, color: colors.black}}>
            @{user?.preferredName}
          </Text>
        </View>
        <UserEarningStats />
        <BankCard user={user} />
        <View style={{marginVertical: 20, marginBottom: 100}}>
          <Header
            text="Edit your details"
            icon={faPencil}
            onPress={() => navigation.navigate('CompleteProfile')}
          />
          <View style={{marginLeft: 20, paddingBottom: 20}}>
            <View
              style={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <FontAwesomeIcon
                style={{marginRight: 15}}
                icon={faEnvelope}
                color={colors.red}
                size={25}
              />
              <Text
                style={{fontSize: 18, fontWeight: '600', color: colors.black}}>
                {user?.email || '...'}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <FontAwesomeIcon
                style={{marginRight: 15}}
                icon={faPhone}
                color={colors.red}
                size={25}
              />
              <Text
                style={{fontSize: 18, fontWeight: '600', color: colors.black}}>
                {user?.phone || '+000 000000 0000'}
              </Text>
            </View>
          </View>
          <Header
            onPress={() => navigation.navigate('Locations')}
            text="Manage your locations"
            icon={faLocationPin}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const UserEarningStats = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            opacity: 0.5,
            color: colors.red,
          }}>
          POSTS
        </Text>
        <Text style={{fontWeight: '600', color: colors.red, fontSize: 20}}>
          100
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            opacity: 0.5,
            color: colors.red,
          }}>
          EARNINGS
        </Text>
        <Text style={{fontWeight: '600', color: colors.red, fontSize: 20}}>
          20K
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            opacity: 0.5,
            color: colors.red,
          }}>
          JOBS
        </Text>
        <Text style={{fontWeight: '600', color: colors.red, fontSize: 20}}>
          10K
        </Text>
      </View>
    </View>
  );
};
const Header = ({icon, text, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE2DC',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
      }}>
      <Text style={{fontSize: 18, fontWeight: '600', color: colors.red}}>
        {text || 'Section Header'}
      </Text>
      <FontAwesomeIcon
        icon={icon || faPencil}
        size={20}
        style={{marginLeft: 'auto', opacity: 0.5}}
        color={colors.red}
      />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => {
  return {user: state.user};
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signOutFromFirebase: firebaseSignOutAction,
      refreshProfile: findUserProfile,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);
