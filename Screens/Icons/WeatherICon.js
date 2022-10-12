import { StyleSheet, View, Button } from "react-native";
import Feather from 'react-native-vector-icons/Feather'

const WeatherIcon = () => {
  return (
    <View>
      <Feather name="cloud-rain" size={30}/>
    </View>
  );
};

export default WeatherIcon;