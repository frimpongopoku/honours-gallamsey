import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toolbar from '../../components/toolbar/Toolbar';
import {ScrollView} from 'react-native-gesture-handler';
import PageTitle from '../../components/intros/PageTitle';
import {faCameraAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import GImagePicker from '../../components/image picker/GImagePicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colors} from '../../styles';
import GButton from '../../components/button/Button';
import {uploadImageToFirebase} from '../../utils';
import {apiCall} from '../../api/messenger';
import {UPDATE_USER_URL} from '../../api/urls';
import {useScrollEventsHandlersDefault} from '@gorhom/bottom-sheet';
import {bindActionCreators} from 'redux';
import {setGallamseyUser} from '../../redux/actions/actions';
import {connect} from 'react-redux';

const ChangeProfilePhoto = ({toolbar = false, user, putUserInRedux}) => {
  const [chosenImage, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendUpdatesToBackend = url => {
    apiCall(UPDATE_USER_URL, {body: {image: url, id: user?._id}}, response => {
      setLoading(false);
      if (!response.success) {
        console.log('ERROR UPDATING IMAGE: ', response.error);
        return Alert.alert(response.error);
      }
      putUserInRedux(user);
      console.log('UPDATED IN BACKEND', response);
    });
  };
  const sendImage = () => {
    setLoading(true);
    uploadImageToFirebase(
      chosenImage,
      {collectionName: 'user'},
      (url, error) => {
        if (error) {
          Alert.alert(error);
          return setLoading(false);
        }
        console.log('UPLOADED IMAGE URL: CHANGE PROFILE PAGE', url);
        sendUpdatesToBackend(url);
      },
    );
  };

  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        {toolbar && <Toolbar title="Change Profile Photo" />}

        <ScrollView>
          <PageTitle
            iconOptions={{icon: faCameraAlt}}
            title="Select a photo"
            subtext="Greet your customers with a smile"
          />

          <GImagePicker
            onImageSelected={image => setImage(image)}
            pickerOptions={{multiple: false}}
            render={(image, openPicker) => {
              return (
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {!image ? (
                    <TouchableOpacity
                      onPress={openPicker}
                      style={{
                        backgroundColor: 'white',
                        elevation: 15,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 190,
                        width: '50%',
                        borderRadius: 1000,
                        marginBottom: 30,
                      }}>
                      <FontAwesomeIcon icon={faPlus} size={50} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={openPicker}
                      style={{
                        height: 190,
                        width: '50%',
                        borderRadius: 1000,
                        marginBottom: 30,
                        elevation: 15,
                      }}>
                      <Image
                        source={{uri: image?.path}}
                        style={{
                          height: 190,
                          // width: '50%',
                          borderRadius: 1000,
                          marginBottom: 30,
                          borderWidth: 3,

                          borderColor: colors.greyish,
                        }}
                      />
                    </TouchableOpacity>
                  )}

                  <Text style={{textAlign: 'center', color: colors.black}}>
                    Tap to select or change picture
                  </Text>
                </View>
              );
            }}
          />
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <GButton loading={loading} onPress={sendImage} variant="green">
            Upload & Save
          </GButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {user: state.user};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      putUserInRedux: setGallamseyUser,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfilePhoto);
