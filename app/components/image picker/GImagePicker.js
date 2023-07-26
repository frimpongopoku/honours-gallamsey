import React, {useState} from 'react';
import {View, Button, Image, StyleSheet, Text} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const GImagePicker = ({pickerOptions, render, onImageSelected}) => {
  const [selectedImages, setSelectedImages] = useState(null);

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageQuality: 0.3,
      ...(pickerOptions || {}),
    })
      .then(images => {
        onImageSelected && onImageSelected(images);
        // const imageUris = images?.map(image => image.path);
        setSelectedImages(images);
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
      });
  };

  if (render) return render(selectedImages, handleImagePicker);

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={handleImagePicker} />
      <View style={styles.imageContainer}>
        {selectedImages?.map((image, index) => (
          <Image key={index} source={{uri: image?.path}} style={styles.image} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default GImagePicker;
