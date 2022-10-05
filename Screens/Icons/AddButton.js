import { StyleSheet, View, Button } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

const AddButton = (text) => {
  return (
      <Ionicons name="add" size={40} color="#FFF" style={{ marginTop: 6, marginLeft: 2}}/>
  );
};

export default AddButton;