import { StyleSheet, View, Button } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ProfilePictureButton = (text) => {
  return (
    <View>
      <FontAwesome name="user-circle" size={30}/>
    </View>
  );
};

export default ProfilePictureButton;