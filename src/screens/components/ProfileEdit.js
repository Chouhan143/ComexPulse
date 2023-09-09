import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Iconic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const ProfileEdit = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate('Account');
  };
  return (
    <ScrollView>
      <Image
        source={require('../../../assets/images/topBg.jpg')}
        height={responsiveHeight(40)}
        width={responsiveWidth(100)}
        style={{position: 'absolute'}}
        resizeMode="contain"
      />
      <View>
        <View style={styles.top}>
          <TouchableOpacity onPress={goBack}>
            <Iconic name="arrow-back" size={25} color={'white'} />
          </TouchableOpacity>
          <View style={styles.top_txt_container}>
            <Text style={styles.top_txt}>Edit Profile</Text>
          </View>
        </View>
        <View style={styles.bottom_main}>
          <View style={styles.bottom_main_top}>
            {/* <View style={styles.bottom_main_top_img}> */}
            <Image
              source={require('../../../assets/images/user.jpg')}
              resizeMode="contain"
              style={styles.bottom_main_top_img}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: responsiveHeight(0),
                width: responsiveWidth(13),
                height: responsiveWidth(13),
                borderRadius: responsiveWidth(7),
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LinearGradient
                colors={['#7F7FD5', '#91EAE4']}
                // colors={['#fbd490', '#f7a5cb']} // Define your gradient colors here
                start={{x: 0, y: 1}} // Start point of the gradient
                end={{x: 1, y: 0}}
                style={{
                  position: 'relative',
                  width: responsiveWidth(11),
                  height: responsiveWidth(11),
                  borderRadius: responsiveWidth(5.5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  //   marginLeft: responsiveWidth(20),
                }}>
                <FontAwesome name="pencil" size={25} color={'#fff'} />
              </LinearGradient>
            </TouchableOpacity>
            {/* </View> */}
          </View>
          <View style={{padding: responsiveWidth(2)}}>
            <View>
              <Text style={styles.bottom_lable}>Name</Text>
              <View style={styles.input_view}>
                <TextInput
                  style={{
                    borderRadius: responsiveWidth(2),
                    paddingLeft: 20,
                    shadowColor: 'black',
                    elevation: 5,
                    backgroundColor: 'white',
                  }}
                  placeholder="Name"
                />
              </View>
            </View>
            <View>
              <Text style={styles.bottom_lable}>Email</Text>
              <View style={styles.input_view}>
                <TextInput style={styles.input_field} placeholder="Email-id" />
              </View>
            </View>
            <View>
              <Text style={styles.bottom_lable}>Mobile</Text>
              <View style={styles.input_view}>
                <TextInput
                  style={styles.input_field}
                  placeholder="Mobile Number"
                />
              </View>
            </View>
            <View>
              <Text style={styles.bottom_lable}>Password</Text>
              <View style={styles.input_view}>
                <TextInput style={styles.input_field} placeholder="Password" />
              </View>
            </View>
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <LinearGradient
                colors={['#4D5DFB', '#08C8F6']}
                start={{x: -0.1, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.button}>
                <Text
                  style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                  Update
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(5),
  },
  top_txt_container: {
    padding: responsiveWidth(2),
    marginLeft: responsiveWidth(3),
  },
  top_txt: {
    color: 'white',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  bottom_main: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: responsiveWidth(8),
    borderTopRightRadius: responsiveWidth(8),
    marginTop: responsiveHeight(4),
  },
  bottom_main_top: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(3.5),
  },
  bottom_main_top_img: {
    width: responsiveWidth(45),
    height: responsiveWidth(45),
    borderRadius: responsiveWidth(22.5),
    backgroundColor: 'gray',
  },
  bottom_lable: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
  input_view: {
    paddingTop: responsiveWidth(2),
    paddingBottom: responsiveWidth(2),
  },
  input_field: {
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(5),
    shadowColor: 'black',
    elevation: 5,
    backgroundColor: 'white',
  },
  button_container: {
    marginTop: responsiveWidth(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: responsiveWidth(95),
    paddingVertical: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
  },
});

export default ProfileEdit;
