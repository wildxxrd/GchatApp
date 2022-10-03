import { StyleSheet, View, Button } from "react-native";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const SettingsButton = (text) => {
  return (
    <View>
      <SimpleLineIcons name="settings" size={50}/>
    </View>
  );
};

export default SettingsButton;