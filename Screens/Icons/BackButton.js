import { StyleSheet, View, Button } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'

const BackButton = (text) => {
  return (
    <View>
      <AntDesign name="back" size={30}/>
    </View>
  );
};

export default BackButton;