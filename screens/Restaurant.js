import React, { useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    Alert
} from "react-native";
import { isIphoneX } from 'react-native-iphone-x-helper'
import { icons, COLORS, SIZES, FONTS } from '../constants'
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import { windowHeight, windowWidth } from '../utils/Dimensions';

const Restaurant = ({ route, navigation }) => {
    let total = 0;
    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [userDepartment, setUserDepartment] = useState(null);
    const [ostatus, setOstatus] = useState(null);
    const [additionalInfo, SetAdditionalInfo] = useState("")
    const [orderItems, setOrderItems] = React.useState([]);
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const ID = user.uid;
    const fetchUserInfo = async () => {
        try {
            await firestore()
                .collection("users")
                .doc(ID)
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
        fetchUserInfo();   
    }, [])
    const handleUpdate = async () => {
        if (total === 0) {
            Alert.alert("NED Express", "Your cart is empty")
        }
        else if (ostatus === "Approved") {
            Alert.alert("NED Express", "Your previous order is already Approved, you can place another order after this order is completed.")
        }
        else if (ostatus === "Shipped") {
            Alert.alert("NED Express", "Your previous order is already Shipped, you can place another order after this order is completed.")
        }
        else {
            await firestore()
                .collection('orders')
                .doc(profile.UserID)
                .set({
                    Order: orderItems,
                    UserID: profile.UserID,
                    Name: profile.Name,
                    RollNo: profile.RollNo,
                    Department: profile.Department,
                    ContactNo: profile.ContactNo,
                    Email: profile.Email,
                    Total: total,
                    OrderTime: firestore.Timestamp.fromDate(new Date()),
                    OrderStatus: "Placed",
                    AdditionalInfo: additionalInfo,
                    VerifiedID: profile.Verified

                }).then(() => {
                    navigation.navigate("OrderDelivery", {
                        restaurant: restaurant,
                        currentLocation: currentLocation,
                        orderItems: orderItems,
                        total: total,
                        //total: total * 0.9, upr bhi total me
                    })
                })
        }

    }

    React.useEffect(() => {
        let { item, currentLocation, userDepartment, ostatus } = route.params;

        setRestaurant(item);
        setCurrentLocation(currentLocation);
        setUserDepartment(userDepartment);
        setOstatus(ostatus)
    })

    function editOrder(action, name, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price,
                    name: name
                }
                orderList.push(newItem)
            }
            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        total = orderItems.reduce((a, b) => a + (b.total || 0), 0)
        return total
        // return total * 0.9
    }

    function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row', height: 50, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6, backgroundColor: COLORS.white
            }}>
                <Ionicons name={"arrow-back-circle"} size={43} style={{ marginTop: 3, marginLeft: 10 }} color={COLORS.secondary} onPress={() => navigation.goBack()} />
                {/* Restaurant Name Section */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 5
                    }}
                >
                    <View
                        style={{
                            height: 37,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{ color: COLORS.black, fontFamily: FONTS.body2.fontFamily, fontSize: windowHeight / 40, fontWeight: "bold" }}>{restaurant?.name}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Ionicons name={"cart-sharp"} size={30} color={COLORS.secondary} />
                </TouchableOpacity>
            </View>
        )
    }

    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{
                                height: windowHeight / 3.5, shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,
                                elevation: 6, backgroundColor: COLORS.white
                            }}>
                                {/* Food Image */}
                                <Image
                                    source={{ uri: item.url }}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "100%"
                                    }}
                                />

                                {/* Quantity */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: - 20,
                                        width: SIZES.width,
                                        height: windowHeight / 15,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.secondary,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", item.name, item.menuId, item.price)}
                                    >
                                        <Text style={{ color: COLORS.white, ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.secondary,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.secondary,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", item.name, item.menuId, item.price)}
                                    >
                                        <Text style={{ color: COLORS.white, ...FONTS.body1 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Name & Description */}
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ color: COLORS.black, marginVertical: 10, textAlign: 'center', fontFamily: FONTS.h2.fontFamily, fontSize: windowHeight / 35 }}>{item.name} - Rs. {item.price}</Text>
                                <Text style={{ color: COLORS.black, fontFamily: FONTS.body5.fontFamily, fontSize: windowHeight / 65 }}>{item.description}</Text>
                            </View>

                            {/* Time */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <Ionicons name={"time-outline"} size={16} color={COLORS.black} />

                                <Text style={{
                                    fontFamily: FONTS.body4.fontFamily, color: COLORS.darygray, fontSize: windowHeight / 75
                                }}>{item.makeTime} minutes</Text>
                            </View>
                            {/* Recommendation */}
                            <View style={styles.recommendationsWrapper}>
                                <Text style={styles.userDetail}><Ionicons name={"restaurant"} size={23} color={COLORS.primary}> </Ionicons>Recommendation: {item.recommendation}</Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View style={{ height: windowHeight / 15 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}
                >
                    {restaurant?.menu.map((item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: "clamp"
                        })

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                            extrapolate: "clamp"
                        })


                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    marginTop: -110,
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor
                                }}
                            />

                        )

                    })}
                </View>
                <View style={{ marginLeft: 20, marginTop: -50 }}>
                    <FormInput
                        placeholder="Additional Info (e.g brand of soft drink)"
                        labelValue={additionalInfo}
                        iconType="reader-outline"
                        autoCorrect={false}
                        onChangeText={(txt) => SetAdditionalInfo(txt)}
                        style
                    /></View>
            </View>
        )
    }

    function renderOrder() {
        return (
            <View>
                {
                    renderDots()
                }
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ color: COLORS.black, fontFamily: FONTS.h3.fontFamily, fontSize: windowHeight / 45 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ color: COLORS.black, fontFamily: FONTS.h3.fontFamily, fontSize: windowHeight / 45 }}>Rs. {sumOrder()}</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name={"location"} size={25} color={COLORS.secondary} style={{ marginLeft: -10 }} />
                            <Text style={{ color: COLORS.black, marginLeft: SIZES.padding, fontFamily: FONTS.h3.fontFamily, fontSize: windowHeight / 45 }}>{userDepartment} Department</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name={"bicycle"} size={25} color={COLORS.secondary} />
                            <Text style={{ color: COLORS.black, marginLeft: SIZES.padding, fontFamily: FONTS.h3.fontFamily, fontSize: windowHeight / 45 }}>COD</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: "center" }}>
                        {/* Order Button */}
                        <FormButton
                            buttonTitle="Place Order"
                            onPress={() => handleUpdate()}
                        />
                    </View>
                </View>

                {isIphoneX() &&
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}
                    >
                    </View>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    recommendationsWrapper: {
        marginTop: 10,
        paddingHorizontal: 10,
        height: windowHeight/16,
        width: windowWidth/1.15,
        backgroundColor: COLORS.secondary,
        borderTopRightRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        justifyContent: 'center'
    },
    userDetail: {
        textAlign: "left",
        color: COLORS.white,
        fontFamily: FONTS.h4.fontFamily,
        fontSize: windowHeight/60
    },
})

export default Restaurant;