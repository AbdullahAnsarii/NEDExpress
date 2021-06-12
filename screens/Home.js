import React, { useState, useContext, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Alert
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Home = ({ navigation }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useContext(AuthContext);
    const ID = user.uid;
    const fetchUserInfo = async () => {
        try {
            await firestore()
                .collection("orders")
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
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading])

    // Dummy Datas

    const initialCurrentLocation = {
        streetName: "NEDUET",
        gps: {
            latitude: 24.853492,
            longitude: 67.014957
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Canteen",
            icon: icons.hamburger,
        },
        {
            id: 2,
            name: "Photocopy",
            icon: icons.book,
        }
    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "Staff Canteen",
            rating: 4.8,
            categories: [1],
            priceRating: affordable,
            photo: images.staff,
            duration: "30 - 45 min",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "Chicken Biryani",
                    photo: images.biryani,
                    description: "Biyani served hot with a chicken piece in a box with a spoon",
                    makeTime: 10,
                    price: 80
                },
                {
                    menuId: 2,
                    name: "Club Sandwich",
                    photo: images.club,
                    description: "Baked Sandwich served with fries and coleslaw",
                    makeTime: 20,
                    price: 110
                },
                {
                    menuId: 3,
                    name: "Shami Burger",
                    photo: images.andashami,
                    description: "Easy to go pocket friendly burger served with fries",
                    makeTime: 15,
                    price: 60
                },
                {
                    menuId: 4,
                    name: "Roll Paratha",
                    photo: images.rollparatha,
                    description: "Chicken roll served with options of different sauces",
                    makeTime: 10,
                    price: 60
                },
                {
                    menuId: 5,
                    name: "Fries",
                    photo: images.fries,
                    description: "French fries served in a paper plate with ketchup",
                    makeTime: 10,
                    price: 30
                },
                {
                    menuId: 6,
                    name: "Samosa",
                    photo: images.samosa,
                    description: "Potato based deep fried samosa",
                    makeTime: 5,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Tea",
                    photo: images.tea,
                    description: "delicious tea served hot",
                    makeTime: 5,
                    price: 20
                },
                {
                    menuId: 8,
                    name: "Soft Drink",
                    photo: images.pepsi,
                    description: "Soft drink can served chilled",
                    makeTime: 1,
                    price: 50
                }
            ]
        },
        {
            id: 2,
            name: "Enviro",
            rating: 4.5,
            categories: [1],
            priceRating: expensive,
            photo: images.enviro,
            duration: "15 - 20 min",
            location: {
                latitude: 1.556306570595712,
                longitude: 110.35504616746915,
            },
            menu: [
                {
                    menuId: 1,
                    name: "Gravy",
                    photo: images.qorma,
                    description: "Hot qorma served only at 1 pm",
                    makeTime: 12,
                    price: 50
                },
                {
                    menuId: 2,
                    name: "Milk Shake",
                    photo: images.shakes,
                    description: "Milk shakes with a variety of flavors",
                    makeTime: 10,
                    price: 60
                }, {
                    menuId: 3,
                    name: "Chicken Biryani",
                    photo: images.biryani,
                    description: "Biyani served hot with a chicken piece in a box with a spoon",
                    makeTime: 10,
                    price: 80
                },
                {
                    menuId: 4,
                    name: "Club Sandwich",
                    photo: images.club,
                    description: "Baked Sandwich served with fries and coleslaw",
                    makeTime: 20,
                    price: 110
                },
                {
                    menuId: 5,
                    name: "Shami Burger",
                    photo: images.andashami,
                    description: "Easy to go pocket friendly burger served with fries",
                    makeTime: 15,
                    price: 60
                },
                {
                    menuId: 6,
                    name: "Roll Paratha",
                    photo: images.rollparatha,
                    description: "Chicken roll served with options of different sauces",
                    makeTime: 10,
                    price: 60
                },
                {
                    menuId: 7,
                    name: "Fries",
                    photo: images.fries,
                    description: "French fries served in a paper plate with ketchup",
                    makeTime: 10,
                    price: 30
                },
                {
                    menuId: 8,
                    name: "Samosa",
                    photo: images.samosa,
                    description: "Potato based deep fried samosa",
                    makeTime: 5,
                    price: 10
                },
                {
                    menuId: 9,
                    name: "Tea",
                    photo: images.tea,
                    description: "delicious tea served hot",
                    makeTime: 5,
                    price: 20
                },
                {
                    menuId: 10,
                    name: "Soft Drink",
                    photo: images.pepsi,
                    description: "Soft drink can served chilled",
                    makeTime: 1,
                    price: 50
                }
            ]
        },
        {
            id: 3,
            name: "Mech Corner",
            rating: 4.9,
            categories: [1],
            priceRating: fairPrice,
            photo: images.mech,
            duration: "20 - 25 min",
            location: {
                latitude: 1.5238753474714375,
                longitude: 110.34261833833622,
            },
            menu: [
                {
                    menuId: 2,
                    name: "Gravy",
                    photo: images.qorma,
                    description: "Hot qorma served only at 1 pm",
                    makeTime: 12,
                    price: 50
                },
                {
                    menuId: 3,
                    name: "Milk Shake",
                    photo: images.shakes,
                    description: "Milk shakes with a variety of flavors",
                    makeTime: 10,
                    price: 60
                }, {
                    menuId: 4,
                    name: "Chicken Biryani",
                    photo: images.biryani,
                    description: "Biyani served hot with a chicken piece in a box with a spoon",
                    makeTime: 10,
                    price: 80
                },
                {
                    menuId: 5,
                    name: "Club Sandwich",
                    photo: images.club,
                    description: "Baked Sandwich served with fries and coleslaw",
                    makeTime: 20,
                    price: 110
                },
                {
                    menuId: 6,
                    name: "Shami Burger",
                    photo: images.andashami,
                    description: "Easy to go pocket friendly burger served with fries",
                    makeTime: 15,
                    price: 60
                },
                {
                    menuId: 7,
                    name: "Roll Paratha",
                    photo: images.rollparatha,
                    description: "Chicken roll served with options of different sauces",
                    makeTime: 10,
                    price: 60
                },
                {
                    menuId: 8,
                    name: "Fries",
                    photo: images.fries,
                    description: "French fries served in a paper plate with ketchup",
                    makeTime: 10,
                    price: 30
                },
                {
                    menuId: 9,
                    name: "Samosa",
                    photo: images.samosa,
                    description: "Potato based deep fried samosa",
                    makeTime: 5,
                    price: 10
                },
                {
                    menuId: 10,
                    name: "Tea",
                    photo: images.tea,
                    description: "delicious tea served hot",
                    makeTime: 5,
                    price: 20
                },
                {
                    menuId: 11,
                    name: "Soft Drink",
                    photo: images.pepsi,
                    description: "Soft drink can served chilled",
                    makeTime: 1,
                    price: 50
                }
            ]
        },
        {
            id: 4,
            name: "Nizami Photostate",
            rating: 4.8,
            categories: [2],
            priceRating: affordable,
            photo: images.nizami,
            duration: "10 - 15 min",
            location: {
                latitude: 1.5578068150528928,
                longitude: 110.35482523764315,
            },
            menu: [
                {
                    menuId: 1,
                    name: "Photocopy",
                    photo: images.photocopy,
                    description: "Photocopy of docs, Rs. 3 per page",
                    makeTime: 20,
                    price: 3
                }
            ]
        },
        {

            id: 5,
            name: "Ali Photostate",
            rating: 4.9,
            categories: [2],
            priceRating: affordable,
            photo: images.alips,
            duration: "35 - 40 min",
            location: {
                latitude: 1.5573478487252896,
                longitude: 110.35568783282145,
            },
            menu: [
                {
                    menuId: 1,
                    name: "Photocopy",
                    photo: images.photocopy,
                    description: "Photocopy of docs Rs. 3 per page",
                    makeTime: 20,
                    price: 3
                },
                {
                    menuId: 2,
                    name: "Printout B&W",
                    photo: images.printb,
                    description: "Greyscale printout",
                    makeTime: 20,
                    price: 10
                },
                {
                    menuId: 3,
                    name: "Printout Color",
                    photo: images.printc,
                    description: "Color printout",
                    makeTime: 30,
                    price: 20
                }
            ]

        }


    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(categoryData)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)
    //setSelectedCategory()
    function onSelectCategory(category) {

        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)
        setSelectedCategory(category)

    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
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
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Ionicons name={"menu-sharp"}  size={30} color={COLORS.secondary} style={{ marginLeft: -2 }} />
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
                        <Text style={{ color: COLORS.black, ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Ionicons name={"cart-sharp"} size={30} color={COLORS.secondary} onPress={()=>{Alert.alert("NED Express", `Order Status: ${profile.OrderStatus}`)}} />
                </TouchableOpacity>
            </View>
        )
    }
    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1, color: COLORS.black }}>Hello, {profile ? profile.Name || 'User' : 'Loading..'}</Text>
                <Text style={{ ...FONTS.h4, color: COLORS.secondary, marginBottom: -10 }}>Choose a category</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => {
                    //isse simple krdo jb contract hojaye baaqi canteen se
                    if (item?.name === "Staff Canteen") {
                        navigation.navigate("Restaurant", {
                            item,
                            currentLocation
                        })
                    }
                    else {
                        Alert.alert("NED Express", "This shop is closed for online delivery at the moment.")
                    }

                }}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={item.photo}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 220,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 51,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.secondary,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ color: "white", ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ color: COLORS.black, fontWeight: "bold", ...FONTS.body2 }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Ionicons name={"star"} size={20} color="#FEBE10" style={{ marginRight: 10 }} />
                    <Text style={{ color: COLORS.black, ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text style={{ color: COLORS.black, ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Home;