import { StyleSheet, View, Button } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'

const PostButton = (text) => {
  return (
    <View>
      <AntDesign name="pluscircle" size={30}/>
    </View>
  );
};

export default PostButton;