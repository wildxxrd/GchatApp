import * as React from "react";
import { StyleSheet, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather'


const HamburgerButton = () => {
  return (
    <View>
      <Feather name="menu" size={50} />
    </View>
  );
};

export default HamburgerButton;
