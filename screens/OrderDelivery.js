import React, { useState, useEffect, useContext } from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import FormButton from '../components/FormButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider';
import { COLORS, FONTS, icons, images, SIZES } from "../constants"
import firestore from '@react-native-firebase/firestore';
const OrderDelivery = ({ route, navigation }) => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [restaurant, setRestaurant] = useState(null)
    const [total, setTotal] = useState(null)
    const [orderItems, setOrderItems] = useState([]);
    const fetchUserInfo = async () => {
        try {
            await firestore()
                .collection("orders")
                .doc(user.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        console.log("User data", documentSnapshot.data());
                        setProfile(documentSnapshot.data());
                    }
                }
                )
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [loading])
    useEffect(() => {
        let { restaurant, orderItems, total } = route.params;
        setRestaurant(restaurant)
        setTotal(total)
        setOrderItems(orderItems)
    }, [])
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        marginTop: -85,
                        marginLeft: -221,
                        width: 73,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <FontAwesome.Button
                        name="arrow-circle-left"
                        size={30}
                        backgroundColor={COLORS.primary}
                        color="#ffff"
                        onPress={() => navigation.navigate("Home")}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    function orderedItem() {
        return orderItems.map((data) => {
            return (
                <View style={styles.orderInfoWrapper}>
                    <Text key={data?.UserID} style={styles.userDetail}>{data?.qty} <Text style={{ fontWeight: "bold", fontSize: 17 }}>X</Text> {data?.name} <Text style={{ fontWeight: "bold", fontSize: 20 }}> : </Text>Rs. {data?.total}</Text>
                </View>
            )
        })
    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            <Image
                source={images.nedexpressicon}
                style={styles.logo}
            />
            <View>
                <Text style={styles.userName}>{profile ? profile.Name || '---' : 'Loading..'}, your order has been placed at {restaurant?.name}.</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={true}
                >
                <View style={styles.totalInfoWrapper}>
                    <Text style={styles.userDetail}><Text style={{ fontWeight: "bold", fontSize: 17 }}>Order Status: {profile ? profile.OrderStatus || '---' : 'Loading..'}</Text></Text>
                </View>
                <View style={styles.totalInfoWrapper}>
                    <Text style={styles.userDetail}><Text style={{ fontWeight: "bold", fontSize: 17 }}>Total Amount : Rs. {total}</Text></Text>
                </View>
                {orderedItem()}
            </ScrollView>
            <FormButton
                buttonTitle="Refresh"
                onPress={() => fetchUserInfo()}
            />
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
        paddingBottom: 90
    },
    scrollContainer: {
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 5,
        paddingBottom: 20
    },
    logo: {
        height: 90,
        width: 220,
        resizeMode: 'cover',
    },
    orderInfoWrapper: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 10,
        position: "relative",
        bottom: 0,
        height: 60,
        width: 350,
        backgroundColor: COLORS.secondary,
        borderTopRightRadius: SIZES.radius,
        borderTopLeftRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        borderBottomRightRadius: SIZES.radius,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center'
    },
    totalInfoWrapper: {
        flex: 1,
        marginTop: 4,
        paddingHorizontal: 10,
        position: "relative",
        bottom: 0,
        height: 60,
        width: 350,
        backgroundColor: "#00ffaa",
        borderTopRightRadius: SIZES.radius,
        borderTopLeftRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        borderBottomRightRadius: SIZES.radius,
        borderWidth: 2,
        borderColor: "black",
        justifyContent: 'center'
    },
    userName: {
        textAlign: "center",
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        ...FONTS.h2
    },
    userDetail: {
        textAlign: "left",
        color: "black",
        ...FONTS.body3
    },
})

