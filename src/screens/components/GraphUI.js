import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import BuySellButton from './BuySellButton';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { useRoute } from '@react-navigation/native';
import { LineChart } from "react-native-gifted-charts"

const GraphUI = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const selectedItem = route.params?.selectedItem;
    console.log("selectedItem", selectedItem);
    const handleGoBack = () => {
        navigation.goBack(); // Go back to the previous screen
    };


    const customDataPoint = () => {
        return (
            <View
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: 'white',
                    borderWidth: 4,
                    borderRadius: 10,
                    borderColor: '#07BAD1',
                }}
            />
        );
    };
    const customLabel = val => {
        return (
            <View style={{ width: 70, marginLeft: 7 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{val}</Text>
            </View>
        );
    };
    const data = [
        {
            value: 100,
            labelComponent: () => customLabel('22 Nov'),
            customDataPoint: customDataPoint,
        },
        {
            value: 140,
            hideDataPoint: true,
        },
        {
            value: 250,
            customDataPoint: customDataPoint,
        },
        {
            value: 290,
            hideDataPoint: true,
        },
        {
            value: 410,
            labelComponent: () => customLabel('24 Nov'),
            customDataPoint: customDataPoint,
            showStrip: true,
            stripHeight: 190,
            stripColor: 'black',
            dataPointLabelComponent: () => {
                return (
                    <View
                        style={{
                            backgroundColor: 'black',
                            paddingHorizontal: 8,
                            paddingVertical: 5,
                            borderRadius: 4,
                        }}>
                        <Text style={{ color: 'white' }}>410</Text>
                    </View>
                );
            },
            dataPointLabelShiftY: -70,
            dataPointLabelShiftX: -4,
        },
        {
            value: 440,
            hideDataPoint: true,
        },
        {
            value: 300,
            customDataPoint: customDataPoint,
        },
        {
            value: 280,
            hideDataPoint: true,
        },
        {
            value: 180,
            labelComponent: () => customLabel('26 Nov'),
            customDataPoint: customDataPoint,
        },
        {
            value: 150,
            hideDataPoint: true,
        },
        {
            value: 150,
            customDataPoint: customDataPoint,
        },
    ];


    return (
        <View style={{ flex: 1, backgroundColor: "rgba(200,200,200,0.8)" }}>

            <View >
                <Image source={require("../../../assets/images/topBg.jpg")} style={{ width: responsiveWidth(100), height: responsiveHeight(40), position: 'absolute', }} />
                <View style={styles.searchContainer}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 40 }}>
                        <View >
                            <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
                                <Icon
                                    name="left"
                                    size={responsiveFontSize(3)}
                                    color={COLORS.black}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '700', color: COLORS.white }}>{selectedItem.trade_name}</Text>
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2.2) }}>₹ {selectedItem.price}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => console.log("notification")}>
                        <Icon2
                            name="star-outlined"
                            size={responsiveFontSize(4)}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            {/* header Ui end here */}

            <View style={{ width: responsiveWidth(100), height: responsiveHeight(100), backgroundColor: '#fff', alignSelf: 'center', borderTopLeftRadius: responsiveWidth(15), borderTopRightRadius: responsiveWidth(15) }}>

                <View style={styles.lowHigh}>
                    <View style={{ borderRightWidth: 2, borderColor: COLORS.primary, paddingVertical: 15 }}>
                        <View style={{ paddingRight: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: responsiveWidth(8), height: responsiveHeight(4), backgroundColor: "rgba(104,195,163,0.5)", justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(6), marginRight: responsiveWidth(1) }}>
                                <Icon
                                    name="arrowup"
                                    size={responsiveFontSize(3)}
                                    color={'green'}
                                />
                            </View>

                            <Text style={[styles.headingText, { fontSize: responsiveFontSize(2.5), color: '#000' }]}>
                                {selectedItem.price}
                            </Text>
                        </View>

                    </View>
                    {/* main View */}
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10 }}>
                            <Text style={styles.headingText}>
                                <Text style={{ color: '#A9A9A9' }}>  Open: </Text>{selectedItem.open}
                            </Text>
                            <Text style={styles.headingText}>
                                <Text style={{ color: '#A9A9A9' }}>  High: </Text>{selectedItem.high}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                            <Text style={styles.headingText}>
                                <Text style={{ color: '#A9A9A9' }}>  Low: </Text> {selectedItem.low}
                            </Text>
                        </View>


                    </View>


                </View>

                {/* Graph Ui Here */}

                <LinearGradient start={{ x: -0.1, y: 0.8 }} end={{ x: 1, y: 1 }} colors={["#4D5DFB", "#08C8F6"]} style={{
                    marginTop: responsiveHeight(3),
                    paddingVertical: 50,
                    width: responsiveWidth(100),
                    height: responsiveHeight(50),
                    alignSelf: 'center',
                    borderRadius: responsiveWidth(3),
                    shadowColor: '#000',
                    elevation: 5,

                }}>
                    <LineChart
                        thickness={6}
                        color="#07BAD1"
                        maxValue={600}
                        noOfSections={3}
                        areaChart
                        yAxisTextStyle={{ color: 'lightgray' }}
                        data={data}
                        curved
                        startFillColor={'rgb(84,219,234)'}
                        endFillColor={'rgb(84,219,234)'}
                        startOpacity={0.4}
                        endOpacity={0.4}
                        spacing={38}
                        // backgroundColor='#616DBC'
                        rulesColor="gray"
                        rulesType="solid"
                        initialSpacing={10}
                        yAxisColor="lightgray"
                        xAxisColor="lightgray"
                        dataPointsHeight={20}
                        dataPointsWidth={20}
                    />
                </LinearGradient>

                {/* Buy & Sell Button  */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('BottomSheet')}>
                        <BuySellButton label='Buy' backgroundColor='green' />
                    </TouchableOpacity>
                    <TouchableOpacity>

                        <BuySellButton label='Sell' backgroundColor="red" />
                    </TouchableOpacity>
                </View>

            </View>



        </View>
    )
}

export default GraphUI
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveWidth(3),
        height: responsiveHeight(20),
        paddingTop: responsiveHeight(5)

    },
    headingText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: COLORS.black,
    },
    upDown: {
        width: responsiveWidth(18),
        height: responsiveHeight(5),
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(1.2),
        marginRight: responsiveWidth(5)
    },

    lowHigh: {
        display: "flex",
        width: responsiveWidth(95),
        height: responsiveHeight(12),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: "rgba(200,200,200,0.5)",
        shadowColor: 'black',
        elevation: '10',
        flexDirection: 'row',
        gap: 20,
        borderRadius: responsiveWidth(2),
        elevation: 5,
        shadowOffset: 2,
        shadowColor: '#000'
    },
    innerLow: {
        width: responsiveWidth(25),
        height: responsiveHeight(5),
        backgroundColor: "rgba(57,73,171,0.2)",
        borderRadius: responsiveWidth(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    LowText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: COLORS.white,
    },
    buttonContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(4),
        borderTopLeftRadius: responsiveWidth(10),


    },
    backIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(9),
        height: responsiveWidth(9),
        borderRadius: responsiveWidth(4.4),
        // backgroundColor: "#616DBC",
        backgroundColor: '#fff'
    }
})