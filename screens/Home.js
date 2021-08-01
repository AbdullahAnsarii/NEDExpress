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
import { windowHeight, windowWidth } from "../utils/Dimensions";
//pass from here to everywhere firebase data
const Home = ({ navigation }) => {
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userDepartment, setUserDepartment] = useState(null);
    const [ostatus, setOstatus] = useState(null);
    const { user } = useContext(AuthContext);
    const ID = user.uid;
    const fetchUserInfo = async () => {
        try {
            await firestore()
                .collection("users")
                .doc(ID)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setName(documentSnapshot.data().Name);
                        setUserDepartment(documentSnapshot.data().Department);
                    }
                }
                )
        } catch (e) {
            Alert.alert(e);
        }
    }
    const fetchOrderInfo = async () => {
        try {
            await firestore()
                .collection("orders")
                .doc(ID)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setOstatus(documentSnapshot.data().OrderStatus);
                    }
                }
                )
        } catch (e) {
            Alert.alert(e);
        }
    }
    useEffect(() => {
        fetchUserInfo();
        fetchOrderInfo();
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
            url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/staff.jpg?alt=media&token=319966ce-6b17-4ab2-8ed2-acdd50204ec1",
            duration: "30 - 45 min",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "Chicken Biryani",
                    description: "Biryani served hot with a chicken piece in a box with a spoon.",
                    makeTime: 10,
                    price: 100,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/biryani.jpg?alt=media&token=7555aaeb-f173-4e5c-a593-17e26b744cf3"
                },
                {
                    menuId: 2,
                    name: "Zinger Burger",
                    description: "Zinger burger with french fries.",
                    makeTime: 20,
                    price: 150,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/zinger.jpg?alt=media&token=6d89c976-2e70-47da-bab4-d3a1143304a9"
                },
                {
                    menuId: 3,
                    name: "Club Sandwich",
                    description: "Baked Sandwich served with fries and coleslaw.",
                    makeTime: 20,
                    price: 150,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/club.jpg?alt=media&token=b27244a8-6055-4ee4-940e-2cca6d13d0a2"
                },
                {
                    menuId: 4,
                    name: "Tikka Sandwich",
                    photo: images.andashami,
                    description: "Sandwich with tikka chunks filling.",
                    makeTime: 20,
                    price: 130,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/Tikka-Sandwich-with-Fries-and-Coleslaw1.jpg?alt=media&token=0e86aa03-b11c-4bf8-94ba-c59232366b2b"
                },
                {
                    menuId: 5,
                    name: "Anday Wala Burger",
                    description: "Shami burger with egg and kebab filling served with fries.",
                    makeTime: 20,
                    price: 80,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/double_egg_shami_burger.jpg?alt=media&token=815b8a9c-3304-4227-b59c-cf60182e453a"
                },
                {
                    menuId: 6,
                    name: "Shami Burger",
                    description: "Pocket friendly shami burger served with fries.",
                    makeTime: 20,
                    price: 60,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/shamii.jpg?alt=media&token=bb74c325-c9b7-4543-b102-07f94be871b8"
                },
                {
                    menuId: 7,
                    name: "Chicken Roll",
                    description: "Chicken tikka chunks roll.",
                    makeTime: 10,
                    price: 60,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/chickenchutney.jpg?alt=media&token=9bd7e007-a00e-44ed-aa8f-0261d1a60847"
                },
                {
                    menuId: 8,
                    name: "Mayo Roll",
                    description: "Chicken roll with mayo sauce.",
                    makeTime: 10,
                    price: 70,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/mayoo.jpg?alt=media&token=688217ea-1d3c-442d-a7de-585975907f9f"
                },
                {
                    menuId: 9,
                    name: "Zinger Roll",
                    description: "Fried chicken wrap.",
                    makeTime: 12,
                    price: 130,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/zingerroll.jpg?alt=media&token=db31e461-bc87-48c0-840b-28490ae8e180"
                },
                {
                    menuId: 10,
                    name: "Fries",
                    photo: images.fries,
                    description: "French fries served with masala and ketchup.\nPlease provide exclusion of ketchup in Additional Info.",
                    makeTime: 10,
                    price: 50,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/frenchfries.jpg?alt=media&token=f5c81172-a649-496a-9831-4cd770ccb7e0"
                },
                {
                    menuId: 11,
                    name: "Spring Roll",
                    description: "Fried roll with vegetable stuffing.",
                    makeTime: 7,
                    price: 20,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/spring.jpg?alt=media&token=90bfb52a-6f12-4832-8385-79d27c7a3eb8"
                },
                {
                    menuId: 12,
                    name: "Samosa",
                    description: "Potato based deep fried samosa.",
                    makeTime: 7,
                    price: 10,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/samosa.jpg?alt=media&token=2eded20a-d204-47a2-b8e2-7e9813da2ee9"
                }, {
                    menuId: 13,
                    name: "Patties",
                    description: "Baked chicken patty.",
                    makeTime: 5,
                    price: 40,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/patties.jpg?alt=media&token=b46f1005-bebe-48c9-8468-7896576abe50"
                },
                {
                    menuId: 14,
                    name: "Milk Shake",
                    description: "Mango Shake, Banana Shake, Ice Cream Shake, Chocolate Shake, Oreo Shake\nPlease provide the flavour in Additional Info.",
                    makeTime: 10,
                    price: 70,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/shakes.jpeg?alt=media&token=869e1760-0b61-4f5b-ad02-db64aa6ff8a0"
                },
                {
                    menuId: 15,
                    name: "Fresh Juice",
                    description: "Orange Juice, Falsa Juice\nPlease provide the flavour in Additional Info.",
                    makeTime: 10,
                    price: 80,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/plastic-juice-glass-4-500x500.jpg?alt=media&token=157941c8-c411-4d35-985a-15ca4f9aa10d"
                },
                {
                    menuId: 16,
                    name: "Tea",
                    description: "delicious tea served hot.",
                    makeTime: 5,
                    price: 30,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/tea.jpg?alt=media&token=57bfa4dd-6e14-49d6-8059-741ecf9ea226"
                },
                {
                    menuId: 17,
                    name: "Soft Drink",
                    description: "Pepsi, Mirinda, Dew, 7up\nPlease provide the option in Additional Info.",
                    makeTime: 2,
                    price: 40,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/can.jpg?alt=media&token=448a5b8f-e008-4c06-abc2-c98a00ef28e4"
                },
                {
                    menuId: 18,
                    name: "Mineral Water",
                    description: "Pure bottled water.",
                    makeTime: 2,
                    price: 40,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/mineral.jpg?alt=media&token=62ac89c7-8e22-4766-a9d1-e78e44427cae"
                },
                {
                    menuId: 19,
                    name: "Slice Juice",
                    description: "Chilled mango flavoured slice juice.",
                    makeTime: 2,
                    price: 30,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/slice.jpg?alt=media&token=ea913542-7c0c-4283-b13d-aa9b2050d2ca"
                },
                {
                    menuId: 20,
                    name: "Biscuit",
                    description: "Gluco, Prince, Gala, Zeera Plus \nPlease provide the option in Additional Info.",
                    makeTime: 2,
                    price: 20,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/biscuits.jpg?alt=media&token=741fc3e4-5a55-4166-b8a4-24717ed7a7b2"
                },
                {
                    menuId: 21,
                    name: "Novita or Chocolatto",
                    description: "Please provide Novita or Chocolatto in Additional Info.",
                    makeTime: 2,
                    price: 10,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/grocerapp-bisconni-novita-chocolate-wafers-5ec38719ef0e4.png?alt=media&token=75777365-3b0a-4e1e-9009-9409de06799e"
                }, {
                    menuId: 22,
                    name: "Cocomo",
                    description: "Cocomo mjhe bhi do.",
                    makeTime: 2,
                    price: 5,
                    url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/cocomo.jpg?alt=media&token=1a3143e2-bcfc-43fc-b47a-c34aa18e606a"
                },
            ]
        },
        {
            id: 2,
            name: "Enviro",
            rating: 4.5,
            categories: [1],
            priceRating: expensive,
            url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/enviroo.jpg?alt=media&token=65abe935-40e0-4d00-acd3-1c73dad5575b",
            duration: "15 - 20 min",
            location: {
                latitude: 1.556306570595712,
                longitude: 110.35504616746915,
            },
            menu: [
            ]
        },
        {
            id: 3,
            name: "Mech Corner",
            rating: 4.9,
            categories: [1],
            priceRating: fairPrice,
            url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/mech.jpg?alt=media&token=35dd45fc-99b4-4724-857c-8751fbb5a471",
            duration: "20 - 25 min",
            location: {
                latitude: 1.5238753474714375,
                longitude: 110.34261833833622,
            },
            menu: [
            ]
        },
        {
            id: 4,
            name: "Nizami Photostate",
            rating: 4.8,
            categories: [2],
            priceRating: affordable,
            url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/photocopy.jpg?alt=media&token=d4c0dd20-2a0b-46e1-b052-1635bb2da721",
            duration: "10 - 15 min",
            location: {
                latitude: 1.5578068150528928,
                longitude: 110.35482523764315,
            },
            menu: []
        },
        {

            id: 5,
            name: "Ali Photostate",
            rating: 4.9,
            categories: [2],
            priceRating: affordable,
            url: "https://firebasestorage.googleapis.com/v0/b/deliverysystem-76971.appspot.com/o/printerc.jpg?alt=media&token=23a020c3-f816-41d7-b7ef-992f00ca1aaa",
            duration: "35 - 40 min",
            location: {
                latitude: 1.5573478487252896,
                longitude: 110.35568783282145,
            },
            menu: []

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
                    <Text style={{ color: COLORS.black, fontSize: windowHeight/40 ,fontFamily: FONTS.h1.fontFamily, }}>NEDUET</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Ionicons name={"information-circle"} size={33} color={COLORS.secondary} onPress={() => { Alert.alert("NED Express", `Order Status: ${ostatus}`) }} />
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
                <Text style={{fontSize: windowHeight/30 ,fontFamily: FONTS.h1.fontFamily, color: COLORS.black }}>Hello, {name ? name || 'User' : ""}</Text>
                <Text style={{fontSize: windowHeight/47 , fontFamily:FONTS.h4.fontFamily, color: COLORS.secondary, marginBottom: -10 }}>Choose a category</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding*2}}
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
                            currentLocation,
                            userDepartment,
                            ostatus
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
                        source={{ uri: item.url }}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: windowHeight/4,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: windowHeight/15,
                            width: windowWidth/3.5,
                            backgroundColor: COLORS.secondary,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ color: "white",fontSize: windowHeight/50, fontFamily: FONTS.h4.fontFamily }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ color: COLORS.black, fontWeight: "bold", fontFamily:FONTS.body2.fontFamily, fontSize: windowHeight/40 }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Ionicons name={"star"} size={20} color="#FEBE10" style={{ marginRight: 10 }} />
                    <Text style={{ color: COLORS.black, fontFamily:FONTS.body2.fontFamily, fontSize: windowHeight/50}}>{item.rating}</Text>

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
                                        <Text style={{ color: COLORS.black, fontFamily:FONTS.body2.fontFamily, fontSize: windowHeight/50 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{color: COLORS.darkgray, fontFamily:FONTS.body2.fontFamily, fontSize: windowHeight/50 }}> . </Text>
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
                                        fontFamily:FONTS.body2.fontFamily, fontSize: windowHeight/50,
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