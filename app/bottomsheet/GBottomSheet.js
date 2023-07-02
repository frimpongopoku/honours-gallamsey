import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const GBottomSheet = () => {
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  const bottomSheetRef = useRef(null);

  const openBottomSheet = () => {
    bottomSheetRef.current.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.collapse();
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        style={{
          backgroundColor: 'white',
          margin: 10,
          elevation: 15,
          borderRadius: 10,
          // position:"absolute", 
          // bottom:0,
        }}
        ref={bottomSheetRef}
        // height={600}
        snapPoints={['30%', '100%']}
        enableContentPanningGesture={true}
        initialSnapIndex={0}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetText}>
            This is the bottom sheet content
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeBottomSheet}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
         
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position:"absolute", 
    // bottom:0, 
    // left:0, 
    // right:0, 
    // width:"100%"
  },

  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetContent: {
  
    flex: 1,
    // backgroundColor: 'blue',
    padding: 16,
    margin: 20,
  },
  bottomSheetText: {
    fontSize: 18,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GBottomSheet;
