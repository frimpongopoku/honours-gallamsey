import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import PageTitle from '../../components/intros/PageTitle';
import GImagePicker from '../../components/image picker/GImagePicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../styles';
import GButton from '../../components/button/Button';

const SecondStage = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const removeImage = path => {
    const rem = selectedImages?.filter(image => image.path !== path);
    setSelectedImages(rem);
  };

  return (
    <View>
      <ScrollView>
        <PageTitle
          v2
          title="Select images"
          subtext="Select images that clearly describe your needs"
        />

        <GImagePicker
          onImageSelected={images =>
            setSelectedImages([...images, ...selectedImages])
          }
          render={(_, openPicker) => {
            return (
              <View style={{padding: 20}}>
                <TouchableOpacity
                  onPress={openPicker}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                    backgroundColor: 'white',
                    elevation: 15,
                    marginBottom: 15,
                  }}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    size={50}
                    color={colors.grey}
                  />
                </TouchableOpacity>
                <View>
                  {selectedImages?.map((image, index) => {
                    return (
                      <View key={index.toString()}>
                        <OneSelected uri={image?.path} onRemove={removeImage} />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          }}
        />
        <View style={{marginVertical: 70}}></View>
      </ScrollView>
      {/* <Text>SecondStage</Text> */}
    </View>
  );
};

const OneSelected = ({uri, onRemove}) => {
  return (
    <View style={{marginVertical: 10, elevation: 15}}>
      <Image source={{uri}} style={{height: 280}} />
      <GButton onPress={() => onRemove && onRemove(uri)}>Remove</GButton>
    </View>
  );
};

export default SecondStage;
