import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, images } from "../constants";
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
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
            >
                <Ionicons name={"menu-sharp"} size={30} color={COLORS.secondary} style={{ marginLeft: -2 }} />
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View
                    style={{
                        width: '70%',
                        height: "70%",
                        backgroundColor: COLORS.lightGray3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius
                    }}
                >
                    <Text style={{ color: COLORS.black, ...FONTS.h3 }}>NEDUET</Text>
                </View>
            </View>

            <TouchableOpacity
                style={{
                    width: 50,
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
            >
                <Ionicons name={"information-circle"} size={33} color={COLORS.secondary} />
            </TouchableOpacity>
        </View>
    )
}
const PromoScreen = () => {
    return (
        <View style={{
            flex: 1,
        }}>
            {renderHeader()}
            <Text style={{ padding: SIZES.padding * 2, ...FONTS.h1, color: COLORS.black }}>Promos</Text>
            <View style={{
                marginHorizontal: 40,
            }}>
            <Image
                source={images.promo1}
                resizeMode={"contain"}
                style={{
                    width: "100%",
                    height: "80%"
                }}
            />
            </View>
        </View>
    );
};

export default PromoScreen;