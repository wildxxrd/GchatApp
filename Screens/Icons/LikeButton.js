import { StyleSheet, View, Button } from "react-native";
import Feather from 'react-native-vector-icons/Feather'

const LikeButton = (text) => {
  return (
    <View>
      <Feather Icon name="heart" size={30} color="red"/>
    </View>
  );
};

export default LikeButton;