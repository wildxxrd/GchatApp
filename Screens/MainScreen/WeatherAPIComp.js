import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const WeatherAPIComp = () => {
  const [apiData, setApiData] = useState({});
  const LONGITUDE = '-83.988441';
  const LATITUDE = '33.957245';
  const API_KEY = 'db12f18bc5905eba0d041ac1efae6145';
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&exclude=hourly,minutely,daily,alerts&units=imperial&appid=${API_KEY}`;
  
  // use effect to get the weather information
useEffect(() => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => setApiData(data));
}, [apiUrl]);


  const iconImg = apiData.current ? "http://openweathermap.org/img/w/"+apiData.current.weather[0].icon+".png" : "http://openweathermap.org/img/w/10d.png";
  return (
    <View style={styles.weatherView}>
          <Image
          style={styles.tinyLogo}
          source={{uri: iconImg,}}
        />
      <Text style={styles.middleViewText}>{apiData.current ? apiData.current.feels_like.toFixed(1) + "\u00B0" : 75}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: 'black'
  },
  middleViewText: {
    fontWeight: "400",
    fontSize: 25,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  weatherView: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default WeatherAPIComp;
