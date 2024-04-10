import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  opacity,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
// import Iconic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Iconic from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Material from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import axios from 'axios';

const Account = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control the modal visibility
  const navigation = useNavigation();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  const goBack = () => {
    navigation.goBack(); // Use the navigation.goBack() method to go back to the previous screen
  };

  const openLogoutConfirmationModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutConfirmationModal = () => {
    setShowLogoutModal(false);
  };

  const [ProfileImg, setProfileImg] = useState('');

  const [state, setState] = useState('');

  // edit profile api here

  const getProfileInfo = async () => {
    try {
      const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const res = await axios.get(
        'https://skycommodity.in/bullsPanel/api/profile-details',
        config,
      );

      const getData = res.data.user_prfile_detail;
      const fullName = ` ${getData.first_name} ${getData.last_name}`;

      setState(fullName);

      setProfileImg(
        getData.profile_picture ||
          require('../../../assets/images/userImg.png'),
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []); // Add dependencies if needed

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.top}>
        <Image
          source={require('../../../assets/images/topBg.jpg')}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(25),
            position: 'absolute',
          }}
        />

        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{paddingLeft: responsiveWidth(3)}}
            onPress={goBack}>
            <Iconic name="arrow-back" size={25} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginHorizontal: responsiveWidth(5),
              marginVertical: responsiveHeight(1),
              backgroundColor: '#fff',
              width: responsiveWidth(8),
              height: responsiveWidth(8),
              borderRadius: responsiveWidth(4),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={openLogoutConfirmationModal}>
            <Font5 name="power-off" size={25} color="red" />
          </TouchableOpacity>
        </View>

        <Image
          source={ProfileImg}
          style={{
            width: responsiveWidth(30),
            height: responsiveWidth(30),
            borderRadius: responsiveWidth(15),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            alignSelf: 'center',
            marginTop: responsiveHeight(12),
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(2),
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: responsiveFontSize(3),
              fontWeight: '700',
            }}>
            {state}
          </Text>
        </View>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal visible={showLogoutModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={closeLogoutConfirmationModal}
                style={[styles.modalButton, {backgroundColor: 'gray'}]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeLogoutConfirmationModal();
                  logout();
                }}
                style={[styles.modalButton, {backgroundColor: 'red'}]}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.bottom}>
        <View style={{marginTop: responsiveHeight(2)}}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item_icon}
              onPress={() => navigation.navigate('ProfileEdit')}>
              <Font5 name="user-plus" size={22} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('ProfileEdit')}>
              <Text style={styles.item_text}>Profile</Text>
            </TouchableOpacity>
          </View>

          <Divider
            style={{height: 1, backgroundColor: 'gray'}}
            horizontalInset={16}
            bold
          />

          <View style={styles.item}>
            <TouchableOpacity style={styles.item_icon}>
              <Icon1 name="cash-refund" size={25} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('Funds')}>
              <Text style={styles.item_text}>Funds</Text>
            </TouchableOpacity>
          </View>

          <Divider
            style={{height: 0.8, backgroundColor: 'gray'}}
            horizontalInset={16}
            bold
          />

          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item_icon}
              onPress={() => navigation.navigate('BankDetails')}>
              <Icon name="bank" size={22} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('BankDetails')}>
              <Text style={styles.item_text}>Bank Details</Text>
            </TouchableOpacity>
          </View>

          <Divider
            style={{height: 0.5, backgroundColor: 'gray'}}
            horizontalInset={16}
            bold
          />

          {/* <View style={styles.item}>
            <TouchableOpacity
              style={styles.item_icon}
              onPress={() => navigation.navigate('Help_Support')}>
              <Material name="headset-mic" size={25} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('Help_Support')}>
              <Text style={styles.item_text}>Help & Support</Text>
            </TouchableOpacity>
          </View> */}
          <Divider
            style={{height: 0.5, backgroundColor: 'gray'}}
            horizontalInset={16}
            bold
          />
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item_icon}
              onPress={() => navigation.navigate('Security')}>
              <MaterialCommunityIcons
                name="security"
                size={25}
                color={'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item_content}
              onPress={() => navigation.navigate('Security')}>
              <Text style={styles.item_text}>Security</Text>
            </TouchableOpacity>
          </View>
          <Divider
            style={{height: 1, backgroundColor: 'gray'}}
            horizontalInset={16}
            bold
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    // backgroundColor: 'lightblue',
  },
  bottom: {
    backgroundColor: '#fff',
    // marginTop: responsiveHeight(20),
  },
  item: {
    flexDirection: 'row',
    padding: responsiveWidth(5),
  },
  item_icon: {
    marginRight: responsiveWidth(1),
  },
  item_content: {
    marginLeft: responsiveWidth(4),
    justifyContent: 'center',
  },
  item_text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  sperator: {
    height: responsiveWidth(0.2),
    backgroundColor: 'gray',
    opacity: 0.5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: responsiveWidth(80),
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Account;
