import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/FontAwesome';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font6 from 'react-native-vector-icons/MaterialIcons';
import Iconic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Edit from '../components/Edit';

import { useNavigation } from '@react-navigation/native'



const Profile = (props) => {
  const navigation = useNavigation();
  const logOut = () => {
    navigation.navigate("Login")
    //  <LoginScreen/>
  }



  return (


      <View style={{flex:1, backgroundColor: "rgba(220,220,220,0.8)" }}>

        {/* profile top */}
        <View style={styles.pro_top}>
          <View style={{ flexDirection: "row", justifyContent: 'space-around',alignItems:'center' }}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center', width: responsiveWidth(12),
                height: responsiveWidth(12), borderWidth: responsiveWidth(0.5),
                borderRadius: responsiveWidth(6),
                borderColor: "blue",
               
                
              }}>
              {/* <Icon name="plus-circle" size={20} color="blue" /> */}
              <Image source={require('../../../assets/images/1x/AccountG.png')}
                style={{ width: responsiveWidth(6), height: responsiveHeight(3), }} />
            </TouchableOpacity>
            <View>

              <Text style={{ color: "black", fontSize: responsiveFontSize(2), marginLeft: 5, fontWeight: '700' }}>Demo</Text>
              <Text style={{ color: "black", fontSize: responsiveFontSize(2), marginLeft: 5, fontWeight: '400' }}>demo@gmail.com</Text>
            </View>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Edit')}>
              {/* <Icon name="plus-circle" size={20} color="blue" /> */}
              <Icon name="chevron-right" size={14} color={"blue"} />
            </TouchableOpacity>
          </View>
        </View>



        {/* Account setting */}
        <View style={styles.acc_set}>
          <View style={{ padding: responsiveWidth(3) }}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "500" }}>Account Settings</Text>
          </View>

          <TouchableOpacity style={[styles.innerDiv,]} onPress={()=> navigation.navigate('ProfileEdit')}>
            <View style={{ flexDirection: "row" }} >
              <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center", paddingLeft:responsiveWidth(4) }}>
                <View style={styles.circle}>
                  <Icon name="user" size={23} color={"blue"} />
                </View>
              </View>
              <View style={{ width: responsiveWidth(58), marginLeft: responsiveWidth(3),justifyContent:'center', }}>
                <Text style={{ color: "black", fontSize: 15 }}>Profile</Text>
              </View>
              <View style={{ width: responsiveWidth(15), alignItems: "flex-end", justifyContent: "center", marginRight: responsiveWidth(5) }}>


                <Icon name="chevron-right" size={14} color={"black"} />


              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.innerDiv,]} onPress={()=> navigation.navigate('Funds')}>
            <View style={{ flexDirection: "row" }} >
              <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center", paddingLeft:responsiveWidth(4) }}>
              <View style={styles.circle}>

                <Font5 name="wallet" size={20} color={"blue"} />
              </View>
              </View>
              <View style={{ width: responsiveWidth(58), marginLeft: responsiveWidth(3),justifyContent:'center', }}>
                <Text style={{ color: "black", fontSize: 15 }}>Funds</Text>
              </View>
              <View style={{ width: responsiveWidth(15), alignItems: "flex-end", justifyContent: "center", marginRight: responsiveWidth(5) }}>
                <Icon name="chevron-right" size={14} color={"black"} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.innerDiv,]}>
            <View style={{ flexDirection: "row" }} >
              <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center", paddingLeft:responsiveWidth(4) }}>
               <View style={styles.circle}>

                <Font6 name="wifi-calling-3" size={23} color={"blue"} />
               </View>
              </View>
              <View style={{ width: responsiveWidth(58), marginLeft: responsiveWidth(3),justifyContent:'center', }}>
                <Text style={{ color: "black", fontSize: 15 }}>Help & Support</Text>
              </View>
              <View style={{ width: responsiveWidth(15), alignItems: "flex-end", justifyContent: "center", marginRight: responsiveWidth(5) }}>
                <Icon name="chevron-right" size={14} color={"black"} />
              </View>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.innerDiv,]}>
            <View style={{ flexDirection: "row" }} >
              <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center", paddingLeft:responsiveWidth(4) }}>
                <View style={styles.circle}>

                <Iconic name="settings" size={23} color={"blue"} />
                </View>
              </View>
              <View style={{ width: responsiveWidth(58), marginLeft: responsiveWidth(3),justifyContent:'center', }}>
                <Text style={{ color: "black", fontSize: 15 }}>Settings</Text>
              </View>
              <View style={{ width: responsiveWidth(15), alignItems: "flex-end", justifyContent: "center", marginRight: responsiveWidth(5) }}>
                <Icon name="chevron-right" size={14} color={"black"} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logOut} onPress={logOut}>
            <Text style={{ fontSize: 18, color: "blue" }}>Log Out</Text>
          </TouchableOpacity> */}
   <View style={styles.setting}>
                <View style={{ padding: responsiveWidth(3) }}>
                    <Text style={{ color: "black", fontSize: 18, fontWeight: "500" }}>Settings</Text>
                </View>
                <View style={{ justifyContent: "space-evenly", alignItems: "center", padding: 10, paddingTop: 0 }}>
                    <TouchableOpacity style={{ width: responsiveWidth(85), height: responsiveHeight(5), backgroundColor: '#007AFF', borderRadius: 5, margin: 5, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 16 }}>Reset Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: responsiveWidth(85), height: responsiveHeight(5), backgroundColor: '#007AFF', borderRadius: 5, margin: 5, justifyContent: "center", alignItems: "center" }} onPress={logOut}>
                        <Text style={{ color: "white", fontSize: 16 }}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>



{/* <ResetLogout/> */}

        </View>





        {/* My Activity */}

        {/* <View style={styles.my_act}>
          <View style={{ padding: responsiveWidth(3) }}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "500" }}>My Activity</Text>
          </View>
          <TouchableOpacity style={{ padding: 10 }}>
            <View style={{ flexDirection: "row" }} >
              <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center" }}>
                <Icon name="comment" size={20} color={"blue"} />
              </View>
              <View style={{ width: responsiveWidth(58), marginLeft: responsiveWidth(3) }}>
                <Text style={{ color: "black", fontSize: 15 }}>Reviews</Text>
              </View>
              <View style={{ width: responsiveWidth(15), alignItems: "flex-end", justifyContent: "center" }}>
                <Icon name="chevron-right" size={14} color={"black"} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <View style={{ flexDirection: "row" }} >
              <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center" }}>
                <Font6 name="file-circle-question" size={20} color={"blue"} />
              </View>
              <View style={{ width: responsiveWidth(58), marginLeft: responsiveWidth(3) }}>
                <Text style={{ color: "black", fontSize: 15 }}>Quetions & Answers</Text>
              </View>
              <View style={{ width: responsiveWidth(15), alignItems: "flex-end", justifyContent: "center" }}>
                <Icon name="chevron-right" size={14} color={"black"} />
              </View>
            </View>
          </TouchableOpacity>
        </View> */}


        {/* Feedback & information */}
        {/* <View style={styles.feedback_info}>
          <View style={{ padding: responsiveWidth(3) }}>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "500" }}>Feedback & Information</Text>
          </View>
          <TouchableOpacity style={{ padding: 10 }}>
            <View style={{ flexDirection: "row" }} >
              <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center" }}>
                <Material name="policy" size={20} color={"blue"} />
              </View>
              <View style={{ width: responsiveWidth(58), marginLeft: responsiveWidth(3) }}>
                <Text style={{ color: "black", fontSize: 15 }}>Terms, Policies and Licenses</Text>
              </View>
              <View style={{ width: responsiveWidth(15), alignItems: "flex-end", justifyContent: "center" }}>
                <Icon name="chevron-right" size={14} color={"black"} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <View style={{ flexDirection: "row" }} >
              <View style={{ width: responsiveWidth(15), justifyContent: "center", alignItems: "center" }}>
                <Font6 name="question" size={20} color={"blue"} />
              </View>
              <View style={{ width: responsiveWidth(58), marginLeft: responsiveWidth(3) }}>
                <Text style={{ color: "black", fontSize: 15 }}>Browse FAQs</Text>
              </View>
              <View style={{ width: responsiveWidth(15), alignItems: "flex-end", justifyContent: "center" }}>
                <Icon name="chevron-right" size={14} color={"black"} />
              </View>
            </View>
          </TouchableOpacity>
        </View> */}

        {/* Log Out */}
        {/* <TouchableOpacity style={styles.logOut} onPress={logOut}>
          <Text style={{ fontSize: 18, color: "blue" }}>Log Out</Text>
        </TouchableOpacity> */}

      </View>
 

  )
}

const styles = StyleSheet.create({
  pro_top: {
    width: responsiveWidth(95),
    height: responsiveHeight(12),
    backgroundColor: "white",
    margin: 10,
    marginTop: 20,
    shadowColor: "black",
    elevation: 10,
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10

  },
  top_item: {

    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    // flexDirection: 'row'

  },
  credit_opt: {
    width: responsiveWidth(95),
    height: responsiveHeight(18),
    backgroundColor: "white",
    margin: 10,
    marginTop: 0,
    shadowColor: "black",
    elevation: 10,
    borderRadius: 10
  },
  acc_set: {
    width: responsiveWidth(95),
    height: responsiveHeight(100),
    backgroundColor: "white",
    margin: 10,
    marginTop: 0,
    shadowColor: "black",
    elevation: 10,
    borderRadius: 10,
    paddingTop: responsiveHeight(4)
  },
  my_act: {
    width: responsiveWidth(95),
    height: responsiveHeight(18),
    backgroundColor: "white",
    margin: 10,
    marginTop: 0,
    shadowColor: "black",
    elevation: 10,
    borderRadius: 10
  },
  feedback_info: {
    width: responsiveWidth(95),
    height: responsiveHeight(18),
    backgroundColor: "white",
    margin: 10,
    marginTop: 0,
    shadowColor: "black",
    elevation: 10,
    borderRadius: 10
  },
  setting: {
    // width: responsiveWidth(95),
    // height: responsiveHeight(16),
    backgroundColor: "white",
    margin: 10,
    marginTop: 0,
    shadowColor: "black",
    elevation: 10,
    borderRadius: 10
},
  logOut: {
    width: responsiveWidth(90), height: responsiveHeight(7), backgroundColor: "white", margin: 18,
    borderRadius: 10, justifyContent: "center", alignItems: "center", shadowColor: "black", elevation: 10, alignSelf: 'center'
  },
  innerDiv: {
    width: responsiveWidth(90), height: responsiveHeight(7), backgroundColor: "white", margin: 18,
    
    borderRadius: 10, justifyContent: "center", alignItems: "center", shadowColor: "black", elevation: 10, alignSelf: 'center'
  },
  circle:{
    width: responsiveWidth(10),
                   height: responsiveWidth(10),
                    borderRadius: responsiveWidth(5),
                      backgroundColor: "rgba(57,73,171,0.4)",justifyContent:'center',alignItems:'center' ,
                     
  }
})
export default Profile 