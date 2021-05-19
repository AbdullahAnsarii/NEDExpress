import React from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { COLORS, FONTS, icons, SIZES } from "../constants"
const OrderDelivery = ({ route, navigation }) => {
    const [restaurant, setRestaurant] = React.useState(null)
    const [total, setTotal] = React.useState(null)
    const [orderItems, setOrderItems] = React.useState([]);
    React.useEffect(() => {
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
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome.Button
                        name="arrow-circle-left"
                        size={30}
                        backgroundColor="orange"
                        color="#ffff"
                        onPress={() => navigation.goBack()}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    function orderedItem() {
        return orderItems.map((data) => {
            return (
                <View style={styles.orderInfoWrapper}>
                    <Text style={styles.userDetail}>{data?.qty} <Text style={{ fontWeight: "bold", fontSize: 17 }}>X</Text> {data?.name} <Text style={{ fontWeight: "bold", fontSize: 20 }}> : </Text>Rs. {data?.total}</Text>
                </View>
            )
        })
    }
    return (
        <ScrollView contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={true}>
            {renderHeader()}
            <Image
                source={icons.nedexpressicon}
                style={styles.logo}
            />
            <View>
                <Text style={styles.userName}>Your Order has been placed at {restaurant?.name}</Text>
            </View>
            {orderedItem()}
            <View style={styles.totalInfoWrapper}>
                <Text style={styles.userDetail}><Text style={{ fontWeight: "bold", fontSize: 17 }}>Total Amount : Rs. {total}</Text></Text>
            </View>
        </ScrollView>
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
        paddingBottom: 60
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
        backgroundColor: "#FED9B1",
        borderTopRightRadius: SIZES.radius,
        borderTopLeftRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        borderBottomRightRadius: SIZES.radius,
        borderWidth: 2,
        borderColor: "orange",
        justifyContent: 'center'
    },
    totalInfoWrapper: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 10,
        position: "relative",
        bottom: 0,
        height: 60,
        width: 350,
        backgroundColor: "#f8ba37",
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
        fontSize: 18,
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

