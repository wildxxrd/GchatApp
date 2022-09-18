import { StyleSheet, View, Button } from "react-native";

const SignUpButton = (text) => {
  return (
    <View>
      <Button style={style.container} title="Login" />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#42855B",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Baskerville-SemiBold",
    fontSize: 25,
    width: 300,
    height: 50,
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default SignUpButton;
