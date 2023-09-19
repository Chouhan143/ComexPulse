// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, } from 'react-native';
import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { COLORS } from '../../constants/theme';
import Btn from '../../constants/Btn';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
// import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
const DocsUpload = () => {
    const [doc, setDoc] = useState();
    const [doc1, setDoc1] = useState();
    const [doc2, setDoc2] = useState();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const containerStyle = {
        backgroundColor: '#fff',
        width: responsiveWidth(90),
        height: responsiveHeight(30),
        borderRadius: responsiveWidth(3),
        alignSelf: 'center',
    };
    const navigation = useNavigation();
    const SelectDOC = async () => {
        try {
            const selectedDoc = await DocumentPicker.pickSingle();
            const imageData = {
                uri: selectedDoc.uri,
                type: selectedDoc.type,
                name: selectedDoc.name || 'image.jpg',
            };
            console.log('image data', imageData);
            setDoc(imageData);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                setDoc(null); // Reset the doc2 state if document selection is canceled
                console.log('User cancelled the upload');
            } else {
                setDoc('Error selecting document'); // Set an error message in doc2 state if there's an error
                console.log(err);
            }
        }
    };

    const SelectDOC1 = async () => {
        try {
            const selectedDoc = await DocumentPicker.pickSingle();
            const imageData = {
                uri: selectedDoc.uri,
                type: selectedDoc.type,
                name: selectedDoc.name || 'image.jpg',
            };
            console.log('image data', imageData);
            setDoc1(imageData);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                setDoc1(null); // Reset the doc2 state if document selection is canceled
                console.log('User cancelled the upload');
            } else {
                setDoc1('Error selecting document'); // Set an error message in doc2 state if there's an error
                console.log(err);
            }
        }
    };

    const SelectDOC2 = async () => {
        try {
            const selectedDoc = await DocumentPicker.pickSingle();
            const imageData = {
                uri: selectedDoc.uri,
                type: selectedDoc.type,
                name: selectedDoc.name || 'image.jpg',
            };
            console.log('image data', imageData);
            setDoc2(imageData);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                setDoc2(null); // Reset the doc2 state if document selection is canceled
                console.log('User cancelled the upload');
            } else {
                setDoc2('Error selecting document'); // Set an error message in doc2 state if there's an error
                console.log(err);
            }
        }
    };


    const handleDocInputChange = value => {
        setDoc(value);
    };

    const handleDoc1InputChange = value => {
        setDoc1(value);
    };

    const handleDoc2InputChange = value => {
        setDoc2(value);
    };



    const handleDocumentSubmit = async () => {
        try {
            const access_token = await AsyncStorage.getItem('accessToken');

            const formData = new FormData();
            // formData.append('id', id);
            formData.append('aadhar_front', {
                uri: doc.uri,
                name: 'aadharFront.jpg',
                type: doc.type,
            });
            formData.append('aadhar_back', {
                uri: doc1.uri,
                name: 'aadharBack.jpg',
                type: doc1.type,
            });
            formData.append('pan_card', {
                uri: doc2.uri,
                name: 'panCard.jpg',
                type: doc2.type,
            });

            console.log('payload', formData);
            setLoading(true);
            const response = await axios.post(
                'https://app.srninfotech.com/bullsScript/api/upload-documents',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            console.log('dss', response.data);
            const result = response.data.status;
            if (result === 200) {
                showModal();
                // navigation.navigate('login');
            } else if (result === 422) {
                const ErrorMsg = response.data.message || 'Registration failed';
                setError(ErrorMsg);
            } else {
                setError('An error occurred. Please try again later.');
            }


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PaperProvider>
            <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
                <View style={{ marginTop: responsiveHeight(3), marginLeft: responsiveWidth(4) }}>
                    <Text style={{ fontSize: responsiveFontSize(2.5), color: 'white', fontWeight: '600', letterSpacing: 2 }}>
                        Documents verification
                    </Text>
                </View>
                {loading && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}

                {!loading && (
                    <View style={{
                        flex: 1, backgroundColor: 'white',
                        borderTopLeftRadius: responsiveWidth(30), marginTop: responsiveHeight(5), paddingTop: responsiveHeight(5)
                    }}>
                        <View style={{ alignSelf: 'center' }}>
                            <View style={{ marginLeft: responsiveWidth(5), marginTop: responsiveHeight(5) }}>
                                <Text style={styles.heading}>
                                    Aadhar image upload (Font side)
                                </Text>
                            </View>

                            <View
                                style={styles.docMainContainer}>
                                <TouchableOpacity onPress={SelectDOC} style={styles.uploadButton}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>Upload</Text>
                                </TouchableOpacity>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <TextInput
                                        value={doc ? doc.name : ''}
                                        onChangeText={handleDocInputChange}
                                        numberOfLines={2}
                                        maxLength={15}
                                        multiline={true}
                                        style={{ color: doc ? 'black' : 'red', fontSize: responsiveFontSize(2.1), fontWeight: '400' }}
                                    />
                                </View>
                            </View>
                            {!doc && (
                                <Text style={{ fontSize: responsiveFontSize(1.6), color: 'red', margin: responsiveWidth(3) }}>
                                    {!doc
                                        ? 'Please select a document'
                                        : doc === 'User cancelled the upload'
                                            ? 'User cancelled the upload'
                                            : 'Error selecting document'}
                                </Text>
                            )}


                            {/* copy above code */}

                            <View style={{ marginLeft: responsiveWidth(3), marginTop: responsiveHeight(2) }}>
                                <Text style={styles.heading}>
                                    Aadhar image upload (Back side)
                                </Text>
                            </View>
                            <View
                                style={
                                    styles.docMainContainer
                                }>
                                <TouchableOpacity onPress={SelectDOC1} style={styles.uploadButton}>

                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>Upload</Text>

                                </TouchableOpacity>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <TextInput
                                        value={doc1 ? doc1.name : ''}
                                        onChangeText={handleDoc1InputChange}
                                        numberOfLines={4}
                                        maxLength={15}
                                        multiline={true}
                                        style={{ color: doc1 ? 'black' : 'red', fontSize: responsiveFontSize(2.1), fontWeight: '400' }}
                                    />
                                </View>
                            </View>

                            {!doc1 && (
                                <Text style={{ fontSize: responsiveFontSize(1.6), color: 'red', margin: responsiveWidth(3) }}>
                                    {!doc1
                                        ? 'Please select a document'
                                        : doc1 === 'User cancelled the upload'
                                            ? 'User cancelled the upload'
                                            : 'Error selecting document'}
                                </Text>
                            )}


                            <View style={{ marginLeft: responsiveWidth(3), marginTop: responsiveHeight(3) }}>
                                <Text style={styles.heading}>
                                    PanCard image upload (Font side)
                                </Text>
                            </View>
                            <View
                                style={
                                    styles.docMainContainer
                                }>
                                <TouchableOpacity onPress={SelectDOC2} style={styles.uploadButton}>

                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>Upload</Text>

                                </TouchableOpacity>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <TextInput
                                        value={doc2 ? doc2.name : ''}
                                        onChangeText={handleDoc1InputChange}
                                        numberOfLines={4}
                                        maxLength={15}
                                        multiline={true}
                                        style={{ color: doc2 ? 'black' : 'red', fontSize: responsiveFontSize(2.1), fontWeight: '400' }}
                                    />
                                </View>
                            </View>

                            {!doc2 && (
                                <Text style={{ fontSize: responsiveFontSize(1.6), color: 'red', margin: responsiveWidth(3) }}>
                                    {!doc2
                                        ? 'Please select a document'
                                        : doc2 === 'User cancelled the upload'
                                            ? 'User cancelled the upload'
                                            : 'Error selecting document'}
                                </Text>
                            )}


                            <View style={{ marginTop: responsiveHeight(10), alignSelf: 'center' }}>
                                <Btn
                                    textColor="white"
                                    bgColor={COLORS.secondary}
                                    btnLabel="Document Submit"
                                    Press={handleDocumentSubmit}

                                />
                            </View>

                        </View>
                    </View>
                )}


                <Portal>
                    <Modal
                        visible={modalVisible}
                        onDismiss={hideModal}
                        contentContainerStyle={containerStyle}>
                        <View
                            style={{
                                position: 'absolute',
                                top: responsiveHeight(-7),
                                width: responsiveWidth(30),
                                height: responsiveWidth(30),
                                borderRadius: responsiveWidth(15),
                                backgroundColor: 'green',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Icon name="check" size={70} color={'white'} />
                        </View>
                        <View style={{ marginTop: responsiveHeight(6) }}>

                            <Text
                                style={{
                                    fontSize: responsiveFontSize(2),
                                    color: 'gray',
                                    textAlign: 'center',
                                    paddingHorizontal: responsiveWidth(15),
                                    marginVertical: responsiveHeight(2),
                                    fontWeight: "600"
                                }}>
                                Documents Uploaded Successfully Wait for Account Activation
                            </Text>
                            <TouchableOpacity
                                style={{
                                    width: responsiveWidth(50),
                                    height: responsiveHeight(7),
                                    backgroundColor: 'green',
                                    borderRadius: responsiveWidth(2),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}
                                onPress={() => {
                                    // Close the modal and navigate
                                    setModalVisible(false);
                                    navigation.navigate('Login');
                                }}>
                                <Text
                                    style={[
                                        styles.BoxContent,
                                        {
                                            color: '#fff',
                                            fontSize: responsiveFontSize(3.3),
                                            fontWeight: '600',
                                        },
                                    ]}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </Portal>

            </View>
        </PaperProvider>
    )
}

export default DocsUpload

const styles = StyleSheet.create({
    docMainContainer: {
        width: responsiveWidth(90),
        height: responsiveHeight(7),
        borderRadius: responsiveWidth(1),
        borderWidth: 1,
        // borderColor: '#757575',
        borderColor: 'gray',
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(3),
        flexDirection: 'row',
        shadowColor: '#f3f0e8',
        elevation: 5,
        alignSelf: 'center'
    },
    uploadButton: {
        width: responsiveWidth(20),
        height: responsiveWidth(8),
        borderRadius: responsiveWidth(50),
        borderColor: '#757575',
        marginLeft: responsiveWidth(1.5),
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        elevation: 5,
        alignSelf: 'center'
    },
    heading: {
        fontSize: responsiveFontSize(2), color: '#000', fontWeight: '700'
    },
    submitButton: {
        width: responsiveWidth(90),
        height: responsiveHeight(8),
        borderRadius: responsiveWidth(1.5),
        borderWidth: 0.5,
        borderColor: '#757575',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(4),
        alignSelf: 'center',
        backgroundColor: '#ACC8E5',
        marginLeft: responsiveWidth(3)
    }
})