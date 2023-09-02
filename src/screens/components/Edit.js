// import { View, Text,StyleSheet } from 'react-native'
// import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Iconic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

// const Edit = () => {
//     return (
//         <>
//             <View style={{ flex: 1, backgroundColor: "rgba(200,200,200,0.8)",padding:10 }}>
//                 <View style={{ width: responsiveWidth(95), height: responsiveHeight(30), backgroundColor: "white",borderRadius:10 }}>
//                     <View style={{ justifyContent: 'center', alignItems: "center" }}>
//                         <View style={styles.main}>
//                             <View style={{ alignItems: "center", padding: 10 }} >
//                                 <Icon name="user-circle" size={responsiveWidth(30)} color="blue" />
//                             </View>
//                             <View >
//                                 <Text style={{ fontSize: 25, color: "black", fontWeight: "700" }}>Name - Ashish Yadav</Text>
//                                 <Text style={{ fontSize: 18, color: "black", fontWeight: "400" }}>Account - ashishyadav@gmail.com</Text>
//                                 <Text style={{ fontSize: 18, color: "black", fontWeight: "400" }}>Pan Card - 9730592488</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </>
//     )
// }

// const styles = StyleSheet.create({
//     main: {
//         width: responsiveWidth(95),
//         borderRadius: 10,
//         backgroundColor: "white",
//         marginTop: 10,
//         margin: 5,
//         padding: 10
//       },
// })
// export default Edit

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

const Edit = () => {
    return (
        <View style={styles.container}>
      
            <View style={styles.profileBox}>
                <View style={{alignSelf:"center"}}>
                <Icon name="user-circle" size={responsiveWidth(30)} color="blue" />
                <Text style={styles.title}>Ashish Yadav</Text>
                </View>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>Ashish Yadav</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>ashish@example.com</Text>

                <Text style={styles.label}>Mobile Number:</Text>
                <Text style={styles.value}>123456789</Text>

                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
    },
    profileBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        shadowColor:"black",
        elevation:10
    },
    title: {
        fontSize: 24,
        color:"black",
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color:"black",
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color:"black",
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    main: {
        width: responsiveWidth(95),
        borderRadius: 10,
        backgroundColor: "white",
        marginTop: 10,
        margin: 5,
        padding: 10
    },
});

export default Edit;
