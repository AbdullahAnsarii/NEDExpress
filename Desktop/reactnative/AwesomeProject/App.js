import React from 'react';
import Providers from './navigation';

const App = () => {
  return <Providers />;
}

export default App;


// import React from 'react';

// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from '@react-navigation/native'

// import {Home, Restaurant, OrderDelivery} from './screens'
// import OnboardingScreen from "./screens/OnboardingScreen"
// import LoginScreen from "./screens/LoginScreen"
// import SignupScreen from "./screens/SignupScreen"
// import Tabs from './navigation/tabs'

// const Stack = createStackNavigator();

// const App = () => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator
//                 screenOptions={{
//                     headerShown: false
//                 }}
//                 //initialRouteName={'Home'}
//             >
//                 <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
//                 <Stack.Screen name= "Login" component={LoginScreen}></Stack.Screen>
//                 <Stack.Screen name= "Signup" component={SignupScreen}></Stack.Screen>
//                 <Stack.Screen name="Home" component={Tabs} />
//                 <Stack.Screen name="Restaurant" component={Restaurant} />
//                 <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

// export default App;