import React, { useState, useEffect, useContext } from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import StepIndicator from 'react-native-step-indicator';
import { COLORS, FONTS, images, SIZES } from "../constants"
import firestore from '@react-native-firebase/firestore';
import { windowHeight, windowWidth } from "../utils/Dimensions";
const OrderDelivery = ({ route, navigation }) => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [restaurant, setRestaurant] = useState(null)
    const [total, setTotal] = useState(null)
    const [orderItems, setOrderItems] = useState([]);
    const labels = ["Order \nPlaced", "Order \nApproved", "Order \nShipped", "Order \nCompleted"];
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 3,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: COLORS.secondary,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: COLORS.primary,
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: COLORS.primary,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: COLORS.primary,
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 12,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: COLORS.secondary,
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: windowHeight / 70,
        currentStepLabelColor: COLORS.secondary,
        labelFontFamily: FONTS.body1.fontFamily
    }
    let currentPosition;
    if (profile) {
        if (profile.OrderStatus === "Placed") {
            currentPosition = 1;
        }
        if (profile.OrderStatus === "Approved") {
            currentPosition = 2;
        }
        if (profile.OrderStatus === "Shipped") {
            currentPosition = 3;
        }
        if (profile.OrderStatus === "Completed") {
            currentPosition = 4;
        }

    } else {
        currentPosition = 0
    }
    const fetchOrderInfo = async () => {
        try {
            await firestore()
                .collection("orders")
                .doc(user.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setProfile(documentSnapshot.data());
                    }
                }
                )
        } catch (e) {
            Alert.alert(e);
        }
    }

    useEffect(() => {
        fetchOrderInfo();
    }, [loading])
    useEffect(() => {
        let { restaurant, orderItems, total } = route.params;
        setRestaurant(restaurant)
        setTotal(total)
        setOrderItems(orderItems)
    }, [])
    //jugaar mathod
    setTimeout(() => fetchOrderInfo(), 5000)
    function orderComplete() {
        return (
            <View style={{alignSelf: "center", marginTop:2}}>
            <FormButton
                buttonTitle="Home"
                onPress={() => navigation.navigate("Home")}
            />
            </View>
        )
    }
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        marginTop: -85,
                        marginRight: windowHeight / 2.25,
                        width: 73,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Ionicons name={"arrow-back-circle"} size={43} style={{ marginTop: 0, marginLeft: 0 }} color={COLORS.secondary} onPress={() => navigation.navigate("Home")} />
                </TouchableOpacity>
            </View>
        )
    }
    function orderedItem() {
        return orderItems.map((data) => {
            return (
                <View style={styles.orderInfoWrapper}>
                    <Text key={data?.UserID} style={styles.userDetail}>{data?.qty} <Text style={{ fontWeight: "bold", fontSize: 17 }}>X</Text > {data?.name} <Text key={data?.UserID} style={{ fontWeight: "bold", fontSize: 20 }}> : </Text>Rs. {data?.total}</Text>
                </View>
            )
        })
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fdfdfd",
            paddingBottom: 20,
            paddingHorizontal: 10,
        }}>
            <View style={styles.container}>

                {renderHeader()}
                <Image
                    source={images.odg}
                    style={styles.logo}
                />
                <View>
                    <Text style={styles.userName}>{profile ? profile.Name || '' : ''}, your order has been placed at {restaurant?.name}.</Text>
                    <Text style={{ fontSize: windowHeight / 70, textAlign: "center", color: COLORS.darkgray, alignContent: "center", fontFamily: FONTS.body1.fontFamily }}><Ionicons name={"call"} size={16} color={COLORS.primary}> </Ionicons>+923012216771</Text>
                    <Text style={{ fontSize: windowHeight / 70, textAlign: "center", color: COLORS.darkgray, alignContent: "center", fontFamily: FONTS.body1.fontFamily }}><Ionicons name={"mail"} size={16} color={COLORS.primary}> </Ionicons>nedexpress.helpcenter@gmail.com</Text>
                </View>
            </View>
            <View>
                <StepIndicator
                    stepCount={4}
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    labels={labels}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={true} persistentScrollbar={true}
            >
                <View style={styles.totalInfoWrapper}>
                    <Text style={styles.userDetail}><Ionicons name={"wallet"} size={23} color={COLORS.primary}> </Ionicons><Text style={{ fontWeight: "bold", fontSize: 17 }}>Total Amount : Rs. {total}</Text></Text>
                </View>
                {orderedItem()}
            </ScrollView>
            {profile ? profile.OrderStatus === "Completed" ? orderComplete() : <Text></Text> : <Text>Loading...</Text>}
        </View>

    )
}
export default OrderDelivery;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 70,
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 5,
        marginBottom: 0
    },
    logo: {
        marginTop: -30,
        height: windowHeight / 4.5,
        width: windowWidth / 2,
        resizeMode: 'stretch',
    },
    orderInfoWrapper: {
        marginTop: 10,
        paddingHorizontal: 10,
        height: windowHeight / 12,
        width: windowWidth / 1.15,
        backgroundColor: COLORS.secondary,
        borderTopRightRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        justifyContent: 'center'
    },
    totalInfoWrapper: {
        marginTop: 10,
        paddingHorizontal: 10,
        height: windowHeight/12,
        width: windowWidth/1.15,
        backgroundColor: "#fda50f",
        borderTopRightRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        justifyContent: 'center'
    },
    userName: {
        color: COLORS.black,
        textAlign: "center",
        fontWeight: 'bold',
        marginTop: 10,
        ...FONTS.h5
    },
    userDetail: {
        textAlign: "left",
        color: COLORS.white,
        fontFamily: FONTS.h4.fontFamily,
        fontSize: windowHeight/50
    },
})