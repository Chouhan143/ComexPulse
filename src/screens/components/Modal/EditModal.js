import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
const EditModal = ({isVisible, closeModal}) => {
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isVisible} onBackdropPress={closeModal}>
        <View style={{flex: 1}}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );
};

export default EditModal;

const styles = StyleSheet.create({});
