import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

const TextInANest = () => {
const [titleText, setTitleText] = useState("Hi");
const bodyText = "Hi";

const onPressTitle = () => {
    setTitleText("Hi [pressed]");
};

return (
    <Text style={styles.baseText}>
    <Text style={styles.titleText} onPress={onPressTitle}>
        {titleText}
        {"\n"}
        {"\n"}
    </Text>
    <Text numberOfLines={5}>{bodyText}</Text>
    </Text>
);
};

const styles = StyleSheet.create({
baseText: {
    fontFamily: "Cochin"
},
titleText: {
    fontSize: 20,
    fontWeight: "bold"
}
});

export default SettingsScreen;