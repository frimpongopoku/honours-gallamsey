import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {View, Image, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {colors} from '../../styles';

const ImagePro = ({imageUrl, style, generics}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [imageUrl]);
  const handleImageLoad = () => {
    console.log('IT has loaded');
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.log('Image don cast');
    setIsError(true);
    setIsLoading(false);
  };
  {
    /* <Image source={fallbackImage} style={styles || styles.image} /> */
  }
  return (
    <View>
      <Image
        style={
          isLoading
            ? {width: 1, display: 'none'}
            : {width: '100%', ...(style || {})}
        }
        source={{uri: imageUrl}}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : isError ? (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.redish,
            width: '100%',
            ...(style || {}),
          }}>
          <FontAwesomeIcon icon={faExclamation} size={30} color={'red'} />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default ImagePro;
