import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { windowHeight, windowWidth } from "../utils/Dimensions";
import {AuthContext} from '../navigation/AuthProvider';
import { icons, COLORS, SIZES, FONTS } from '../constants'
import firestore from '@react-native-firebase/firestore';

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
            console.log("User data",documentSnapshot.data());
            setProfile(documentSnapshot.data());
          }
        }                 
          )
      }catch(e){
          console.log(e);
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
          source={{uri: profile ? profile.UserImg || 'https://picsum.photos/200/300' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
        />
        <Text style={styles.userName}>{profile ? profile.Name || '---' : 'Loading..'}</Text>
        <View style={styles.userBtnWrapper}>
            <TouchableOpacity style={styles.userBtn} onPress={()=>{navigation.navigate("EditProfileScreen");}}>
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={()=>logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}>Department: {profile ? profile.Department || '---' : 'Loading..'}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}>Roll No: {profile ? profile.RollNo || '---' : 'Loading..'}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}>Email: {profile ? profile.Email || '---' : 'Loading..'}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}>Contact No: {profile ? profile.ContactNo || '---' : 'Loading..'}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text style={styles.userDetail}>Verified ID: {profile ? profile.Verified || "---" : 'Loading..'}</Text>
        </View>
        </ScrollView>
        
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    ...FONTS.h2
  },
  userDetail: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    ...FONTS.h3
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
    ...FONTS.h4
  },
  userInfoWrapper: {
    flex:1,
    marginTop: 10,
    paddingHorizontal: 10,
    position: "relative",
    bottom: 0,
    height: 70,
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