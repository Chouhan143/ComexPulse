import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/FontAwesome';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Iconic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Help_Support = () => {
    const navigation = useNavigation()
    const goBack = () => {
        navigation.navigate("Account")

    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Image source={require("../../../assets/images/topBg.jpg")} height={responsiveHeight(40)} width={responsiveWidth(100)} style={{ position: "absolute" }} resizeMode='contain' />
            <View style={{ flex: 1 }}>
                <View style={styles.top}>
                    <TouchableOpacity onPress={goBack}>
                        <Iconic name="arrow-back" size={25} color={"white"} />
                    </TouchableOpacity>
                    <View style={styles.top_txt_container}>
                        <Text style={styles.top_txt}>Help & Support</Text>
                    </View>
                </View>
                <View style={styles.bottom_main}>
                    <View style={{  }}>
                        <Text style={styles.bottom_lable}>Email Us</Text>
                        <View style={{width:responsiveWidth(96),paddingVertical:responsiveHeight(2),backgroundColor:"white",shadowColor:"black",elevation:10,borderRadius:responsiveWidth(2)}}>
                            <Text>abc@gmail.com</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    top: {
        flex: 1, alignItems: "center", flexDirection: "row", padding: responsiveWidth(5)
    },
    top_txt_container: {
        padding: responsiveWidth(2), marginLeft: responsiveWidth(3)
    },
    top_txt: {
        color: "white", fontSize: responsiveFontSize(2.5), fontWeight: "bold"
    },
    bottom_main: {
        flex: 1, backgroundColor: "#fff", borderTopLeftRadius: responsiveWidth(8),
        borderTopRightRadius: responsiveWidth(8), marginTop: responsiveHeight(4),
        padding: responsiveWidth(2)
    },
    bottom_main_top: {
        justifyContent: "center", alignItems: "center", padding: responsiveWidth(3.5)
    },
    bottom_main_top_img: {
        width: responsiveWidth(45), height: responsiveWidth(45), borderRadius: responsiveWidth(22.5),
        backgroundColor: "gray"
    },
    bottom_lable: {
        fontSize: responsiveFontSize(1.8), color: "black"
    },
    input_view: {
        paddingTop: responsiveWidth(2), paddingBottom: responsiveWidth(2), borderRadius: responsiveWidth(2), paddingLeft: responsiveWidth(5), shadowColor: "black",
        elevation: 5, backgroundColor: "white"
    },
    input_field: {
        borderRadius: responsiveWidth(2), paddingLeft: responsiveWidth(5), shadowColor: "black",
        elevation: 5, backgroundColor: "white"
    },
    button_container: {
        marginTop: responsiveHeight(5), justifyContent: "center", alignItems: "center"
    },
    button: {
        width: responsiveWidth(95), paddingVertical: responsiveWidth(3), justifyContent: "center",
        alignItems: "center", borderRadius: responsiveWidth(2)
    }
})

export default Help_Support;