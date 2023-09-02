import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../../constants/theme'

const BuySellButton = ({ label, backgroundColor }) => {

    const buttonStyle = {
        ...styles.btncontainer,
        backgroundColor: backgroundColor || 'green',

    }


    return (
        <View>
            <View style={buttonStyle}>
                <Text style={styles.btnText}>{label}</Text>
            </View>
        </View>
    )
}

export default BuySellButton

const styles = StyleSheet.create({
    btncontainer: {
        display: 'flex',
        width: responsiveWidth(44),
        height: responsiveHeight(7),
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(1)
    },
    btnText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: COLORS.white,

    }
})