import React, {useContext, useState} from "react";
import { View, Button, StyleSheet, Text, ImageBackground } from "react-native";
import { icons, COLORS, SIZES, FONTS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormInput from '../components/FormInput';

const EditProfileScreen = () => {
    const [name, setName] = useState();
    const [department, setDepartment] = useState();
    const [rollno, setRollno] = useState();
    const [email, setEmail] = useState();
    const [contactno, setContactno] = useState();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Edit Profile</Text>
            <View style={{alignItems: 'center'}}>
            <View
              style={{
                height: 150,
                width: 100,
                borderRadius: 125,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: 'https://picsum.photos/200/300',
                }}
                style={{height: 150,width: 150,}}
                imageStyle={{borderRadius: 75}}>
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
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            John Doe
          </Text>
        </View>
        <FormInput
            labelValue={name}
            onChangeText={(userName) => setName(userName)}
            placeholderText="Name"
            iconType="person-outline"
            autoCorrect={false}
        />
        <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText="Email"
            iconType="at"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
        />
        <FormInput
        labelValue={contactno}
        onChangeText={(userContactno) => setContactno(userContactno)}
        placeholderText="Contact no."
        iconType="call-outline"
        keyboardType="numeric"
        autoCorrect={false}
        />
        <FormInput
        labelValue={rollno}
        onChangeText={(userRollno) => setRollno(userRollno)}
        placeholderText="Roll no. (CS-XXXXX)."
        iconType="card-outline"
        autoCorrect={false}
        />
        <FormInput
            labelValue={department}
            onChangeText={(userDepartment) => setDepartment(userDepartment)}
            placeholderText="Department"
            iconType="book-outline"
            autoCorrect={false}
        />   
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontFamily: FONTS.h1.fontFamily,
        fontSize: 32,
        marginBottom: 10,
        color: '#051d5f',
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
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
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
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
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
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#333333',
    },
  });

