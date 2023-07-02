import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {colors} from '../../styles';

const GModal = ({show, children, style}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.button}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={{...styles.modalContent, ...(style || {})}}>
            <View
              style={{
                display: 'flex',
                // flexDirection: 'row-reverse',
                backgroundColor: 'transparent',
                position: 'absolute',
                right: 0,
                top: 0,
                padding: 10,
              }}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  size={25}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>
            {/* <Text style={styles.modalText}>This is a modal dialog!</Text> */}
            {/* <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity> */}
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    // padding: 16,
    borderRadius: 8,
    // alignItems: 'center',
    elevation: 10,
    minHeight: 50,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GModal;
