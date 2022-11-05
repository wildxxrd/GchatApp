import { StyleSheet, View, Button } from "react-native";
import Icon from 'react-native-vector-icons/Octicons'

const ReportButton = (text) => {
  return (
    <View>
      <Icon name="report" size={30} color="red"/>
    </View>
  );
};

export default ReportButton;