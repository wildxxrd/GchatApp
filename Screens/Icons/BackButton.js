import { StyleSheet, View, Button } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'

const BackButton = (text) => {
  return (
    <View>
      <AntDesign name="back" size={50}/>
    </View>
  );
};

export default BackButton;