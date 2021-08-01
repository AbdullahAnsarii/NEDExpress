import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { windowHeight, windowWidth } from "../utils/Dimensions";
import {AuthContext} from '../navigation/AuthProvider';
import { COLORS, SIZES, FONTS } from '../constants'
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';


let ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user, logout} = useContext(AuthContext);
  const ID = user.uid;
  const fetchUserInfo = async() => {
    try{
        await firestore()
        .collection("users")
        .doc(ID)
        .get()
        .then((documentSnapshot)=>{
          if(documentSnapshot.exists){
            setProfile(documentSnapshot.data());
          }
        }                 
          )
      }catch(e){
          Alert.alert(e);
      }
}
  useEffect(()=>{
    fetchUserInfo();
    navigation.addListener("focus", () => setLoading(!loading));
  },[navigation, loading]) 
    return(
        
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{uri: profile ? profile.UserImg || 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/blank-user.png' : 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/user-default.png'}}
        />
        <Text style={styles.userName}>{profile ? profile.Name || '---' : ''}</Text>
        <View style={styles.userBtnWrapper}>
            <TouchableOpacity style={styles.userBtn} onPress={()=>{navigation.navigate("EditProfileScreen");}}>
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={()=>logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}><Ionicons name={"business"} size={20} color={COLORS.primary}> </Ionicons> {profile ? profile.Department || '---' : 'Loading..'}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}><Ionicons name={"card"} size={23} color={COLORS.primary}> </Ionicons> {profile ? profile.RollNo || '---' : 'Loading..'}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}><Ionicons name={"mail"} size={23} color={COLORS.primary}> </Ionicons> {profile ? profile.Email || '---' : 'Loading..'}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}><Ionicons name={"call"} size={23} color={COLORS.primary}> </Ionicons> {profile ? profile.ContactNo || '---' : 'Loading..'}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}><Ionicons name={"checkmark-circle"} size={22} color={COLORS.primary}> </Ionicons> {profile ? profile.Verified || "No" : 'Loading..'}</Text>
        </View>
        </ScrollView>
        
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowHeight/50,
  },
  userImg: {
    height: windowHeight/6,
    width: windowHeight/6,
    borderRadius: 75,
  },
  userName: {
    fontSize: windowHeight/45,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: COLORS.black,
    fontFamily: FONTS.h2.fontFamily
  },
  userDetail: {
    fontWeight: "bold",
    textAlign: "left",
    color: COLORS.white,
    fontFamily: FONTS.h4.fontFamily,
    fontSize: windowHeight/40
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    marginHorizontal: 5,
    fontFamily: FONTS.body1.fontFamily,
    width: SIZES.width * 0.9,
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    marginTop: 10,
    width: '42%',
    height: windowHeight / 15,
    justifyContent: 'center',
    
  },
  userBtnTxt: {
    color: 'white',
    fontFamily: FONTS.h4.fontFamily,
    fontSize: windowHeight/45
  },
  userInfoWrapper: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: windowHeight/12,
    width: windowWidth/1.15,
    backgroundColor: COLORS.secondary,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    justifyContent: 'center'
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});