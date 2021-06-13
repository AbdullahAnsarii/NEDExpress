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

const Restaurant = ({ route, navigation }) => {
    let total = 0;
    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [userDepartment, setUserDepartment] = React.useState(null);
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
                OrderStatus: "Placed"

            })
            .then(() => {
                if (total === 0) {
                    Alert.alert("NED Express", "Your cart is empty")
                }
                else {
                    navigation.navigate("OrderDelivery", {
                        restaurant: restaurant,
                        currentLocation: currentLocation,
                        orderItems: orderItems,
                        total: total,
                    })
                }
            })
    }

    React.useEffect(() => {
        let { item, currentLocation, userDepartment } = route.params;

        setRestaurant(item);
        setCurrentLocation(currentLocation);
        setUserDepartment(userDepartment);
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
                        <Text style={{ color: COLORS.black, ...FONTS.h3 }}>{restaurant?.name}</Text>
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
                                height: SIZES.height * 0.35, shadowColor: "#000",
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
                                    source={item.photo}
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
                                        height: 50,
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
                                <Text style={{ color: COLORS.black, marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name} - Rs. {item.price}</Text>
                                <Text style={{ color: COLORS.black, ...FONTS.body3 }}>{item.description}</Text>
                            </View>

                            {/* Calories */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Ionicons name={"time-outline"} size={23} color={COLORS.black} />

                                <Text style={{
                                    ...FONTS.body3, color: COLORS.darygray
                                }}>{item.makeTime} minutes</Text>
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
            <View style={{ height: 30 }}>
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
                        <Text style={{ color: COLORS.black, ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ color: COLORS.black, ...FONTS.h3 }}>Rs. {sumOrder()}</Text>
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
                            <Text style={{ color: COLORS.black, marginLeft: SIZES.padding, ...FONTS.h4 }}>{userDepartment} Department</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name={"bicycle"} size={25} color={COLORS.secondary} />
                            <Text style={{ color: COLORS.black, marginLeft: SIZES.padding, ...FONTS.h4 }}>COD</Text>
                        </View>
                    </View>

                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => handleUpdate()}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Place Order</Text>
                        </TouchableOpacity>
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
    }
})

export default Restaurant;