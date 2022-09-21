import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../../config";

const SignInMainScreen = ({ navigation }) => {
  const signInTitleText = "Log in to your account";
  const signUpFooterText = "New To GGChat?  ";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <Image style={style.img} source={require("../../assets/logo.jpg")} />
      <Text style={style.titleText}>{signInTitleText}</Text>
      <View>
        <TextInput
          style={style.input}
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={style.input}
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={() => loginUser(email, password)}>
        <Text style={style.logInButton}>Log In</Text>
      </TouchableOpacity>
      <Text style={style.footerText}>
        {signUpFooterText}
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
          <Text style={style.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  titleText: {
    fontSize: 30,
    marginHorizontal: 20,
    fontWeight: "bold",
    fontFamily: "Baskerville-SemiBold",
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 60,
    marginBottom: 20,
    width: 250,
    height: 275,
  },
  input: {
    backgroundColor: "#DFDFDE",
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 10,
  },
  logInButton: {
    backgroundColor: "#277BC0",
    marginHorizontal: 120,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Baskerville-SemiBold",
    fontSize: 25,
    width: 100,
    height: 50,
    marginBottom: 40,
    padding: 10,
    borderRadius: 30,
  },
  signUpText: {
    color: "#277BC0",
    fontSize: 18,
    fontFamily: "Baskerville-Bold",
  },
  footerText: {
    marginHorizontal: 100,
    fontSize: 18,
    fontFamily: "Baskerville",
  },
});

export default SignInMainScreen;
