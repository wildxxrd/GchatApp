import { StyleSheet, View, Button } from "react-native";
import Feather from 'react-native-vector-icons/Feather'

const LogOutButton = (text) => {
  return (
    <View>
      <Feather name="log-out" size={50} />
    </View>
  );
};

export default LogOutButton;