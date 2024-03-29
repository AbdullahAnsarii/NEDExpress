import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { SIZES, FONTS, COLORS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { windowHeight, windowWidth } from '../utils/Dimensions';
//import storage from '@react-native-firebase/storage';

const EditProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState('https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/user-default.png');
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const ID = user.uid;
  const bs = React.createRef();
  const fall = new Animated.Value(1);

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     bs.current.snapTo(1);
  //   });
  // }
  const fetchUserInfo = async () => {
    try {
      await firestore()
        .collection("users")
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
  }, [])
  const handleUpdate = async () => {
    // let imgUrl = await uploadImage();

    // if( imgUrl == null && userData.userImg ) {
    //   imgUrl = userData.userImg;
    // }

    firestore()
      .collection('users')
      .doc(ID)
      .update({
        Name: profile.Name,
        RollNo: profile.RollNo,
        Department: profile.Department,
        ContactNo: profile.ContactNo,
        Verified: "Not Verified"
        //userImg: imgUrl,
      })
      .then(() => {
        Alert.alert(
          'NED Express',
          '1)Your profile has been updated successfully. \n2)Update Image feature will be available soon.'
        );
      })
  }


  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      bs.current.snapTo(1)
      // console.log(image);
      setImage(image.path);
    }).catch((err) => { console.log("photoupload catch" + err.toString()) });
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <FormButton
        buttonTitle="Take Photo"
        onPress={() => Alert.alert("NED Express", "This feature will be available soon!")}
      />
      <FormButton
        buttonTitle="Choose From Device"
        onPress={choosePhotoFromLibrary}
      />
      <FormButton
        buttonTitle="Cancel"
        onPress={() => bs.current.snapTo(1)}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={{ marginLeft: windowHeight/90, marginRight: windowHeight/2.25, marginTop: 8, marginBottom: -20 }}>
        <Ionicons name={"arrow-back-circle"} size={43} style={{ marginTop: 0, marginLeft: 0 }} color={COLORS.secondary} onPress={() => navigation.goBack()} />
      </View>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
          <Text style={styles.text}>Edit Profile</Text>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                marginLeft: windowWidth/3,
                height: windowHeight/5,
                width: windowWidth/4,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={
                  { uri: profile ? profile.UserImg || image : image }
                }
                style={{ 
                  height: windowHeight/6,
                  width: windowHeight/6,
                  borderRadius: 75, }}
                imageStyle={{ borderRadius: 75 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginVertical: 13, fontSize: windowHeight/45, fontWeight: 'bold', textAlign: 'center', color: COLORS.black }}>
            {profile ? profile.Name || '' : ''}
          </Text>

          <FormInput
            placeholder="Name "
            labelValue={profile ? profile.Name : ''}
            iconType="person-outline"
            autoCorrect={false}
            onChangeText={(txt) => setProfile({ ...profile, Name: txt })}
          />
          <FormInput
            labelValue={profile ? profile.ContactNo : ''}
            onChangeText={(txt) => setProfile({ ...profile, ContactNo: txt })}
            placeholderText="Contact no.     "
            iconType="call-outline"
            keyboardType="numeric"
            autoCorrect={false}
            maxLength={11}
          />
          <FormInput
            labelValue={profile ? profile.RollNo : ''}
            onChangeText={(txt) => setProfile({ ...profile, RollNo: txt })}
            placeholderText="Roll no. (1XXXX).   "
            iconType="card-outline"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={5}
          />
          <View style={styles.picker}>
            <View style={styles.iconStyle}>
              <Ionicons name={"book-outline"} size={25} color="#666" />
            </View>
            <Picker
              selectedValue={profile ? profile.Department : 'Department'}
              style={{ height: windowHeight/15, width: "86%", color: COLORS.black }}
              onValueChange={(itemValue) => setProfile({ ...profile, Department: itemValue })}
              dropdownIconColor={COLORS.primary}
              mode={"dropdown"}

            >
              <Picker.name label="Department" value="" style={{ color: COLORS.secondary }} />
          <Picker.Item label="1) Computer Systems Engineering" value="CIS" style={{ color: COLORS.black }} />
          <Picker.Item label="2) Electrical Engineering" value="EE" style={{ color: COLORS.black }} />
          <Picker.Item label="3) Electronic Engineering" value="EL" style={{ color: COLORS.black }} />
          <Picker.Item label="4) Mechanical Engineering" value="ME" style={{ color: COLORS.black }} />
          <Picker.Item label="5) Textile Engineering" value="TE" style={{ color: COLORS.black }} />
          <Picker.Item label="6) Industrial & Manufacturing Engineering" value="IM" style={{ color: COLORS.black }} />
          <Picker.Item label="7) Civil Engineering" value="CE" style={{ color: COLORS.black }} />
          <Picker.Item label="8) Software Engineering" value="SE" style={{ color: COLORS.black }} />
          <Picker.Item label="9) Computer Science and Info. Technology" value="BCIT" style={{ color: COLORS.black }} />
          <Picker.Item label="10) Chemical Engineering" value="CH" style={{ color: COLORS.black }} />
          <Picker.Item label="11) Petroleum Engineering" value="PE" style={{ color: COLORS.black }} />
          <Picker.Item label="12) Urban Engineering" value="UE" style={{ color: COLORS.black }} />
          <Picker.Item label="13) Polymer & Petrochemical Engineering" value="PP" style={{ color: COLORS.black }} />
          <Picker.Item label="14) Industrial Chemistry" value="IC" style={{ color: COLORS.black }} />
          <Picker.Item label="15) Textile Sciences" value="TS" style={{ color: COLORS.black }} />

            </Picker>
          </View>
        </Animated.View>
        <FormButton
          buttonTitle="Submit"
          onPress={() => handleUpdate()}
        />
        <Text style={{fontSize:13, color: COLORS.darkgray, fontStyle: "italic"}}>don't edit credentials if your ID is verified</Text>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  picker: {
    marginTop: 0,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: SIZES.radius,
    borderWidth: 1,
    flexDirection: 'row',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
  },
  text: {
    alignSelf:"center",
    fontFamily: FONTS.h1.fontFamily,
    fontSize: windowHeight/26,
    marginBottom: windowHeight/60,
    color: COLORS.black,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    margin: -10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: SIZES.h2,
    color: COLORS.black,
    fontFamily: FONTS.h1.fontFamily,
    height: 35,
  },
  panelSubtitle: {
    fontSize: SIZES.body3,
    color: 'gray',
    fontFamily: FONTS.h1.fontFamily,
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
});

