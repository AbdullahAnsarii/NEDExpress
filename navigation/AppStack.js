import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {Home, Restaurant, OrderDelivery, } from "../screens";
import EditProfileScreen from "../screens/EditProfileScreen";
import Tabs from './tabs';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
           <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Restaurant" component={Restaurant} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            </Stack.Navigator>
    )
}

export default AppStack;