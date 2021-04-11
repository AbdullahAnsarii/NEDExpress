import React from "react";
import { View, Button } from "react-native";

const EditProfileScreen = () => {
    return (
        <View>
            <Button
            title="Test"
            onPress={()=>alert("button clicked")}>
            </Button>   
        </View>
    );
};

export default EditProfileScreen;
