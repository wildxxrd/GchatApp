import { StyleSheet, View, Button } from "react-native";
import Feather from 'react-native-vector-icons/Feather'

const RefreshButton = (text) => {
  return (
    <View>
      <Feather name="refresh-cw" size={30}/>
    </View>
  );
};

export default RefreshButton;