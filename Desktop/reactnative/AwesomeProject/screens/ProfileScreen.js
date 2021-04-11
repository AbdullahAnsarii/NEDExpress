import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { windowHeight, windowWidth } from "../utils/Dimensions";
import {AuthContext} from '../navigation/AuthProvider';
import { icons, COLORS, SIZES, FONTS } from '../constants'
import firestore from '@react-native-firebase/firestore';

let ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user, logout} = useContext(AuthContext);
  const ID = user.uid;
  const fetchUserInfo = async() => {
    try{
        const list = [];
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
  },[]) 
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{uri: profile ? profile.UserImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
        />
        <Text style={styles.userName}>{profile ? profile.Name || 'Test' : 'Test'}</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>
        ko
        </Text>
        <View style={styles.userBtnWrapper}>
            <TouchableOpacity style={styles.userBtn} onPress={()=>{}}>
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={()=>logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
        <Text></Text>
        </View>
        </ScrollView>
        </SafeAreaView>
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
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
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
    marginTop: 40,
    position: "relative",
    bottom: 0,
    height: 350,
    width: 350,
    backgroundColor: "#FED8B1",
    borderTopRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    alignItems: 'center',
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