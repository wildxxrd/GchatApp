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
  const signUpFooterText = "New To GGChat? ";
  const forgotPasswordText = "Forgot Password? ";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  //forgot password
  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password Email Sent");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View>
      <View style={style.container}>
        <Image
          style={style.img}
          source={require("../../assets/ggc_logo.png")}
        />
        <Text style={style.titleText}>{signInTitleText}</Text>
        <View>
          <TextInput
            style={style.input}
            placeholderTextColor="#DFF6FF"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={style.input}
            placeholderTextColor="#DFF6FF"
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
        <Text style={style.footerText}>
        {"\n"}
          {forgotPasswordText}
          <TouchableOpacity
            onPress={() => {
              forgotPassword();
            }}
          >
            <Text style={style.signUpText}>Reset Password</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000000",
    height: "100%",
  },
  titleText: {
    color: "#47B5FF",
    fontSize: 30,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 60,
    marginBottom: 20,
    marginTop: 40,
    width: 255,
    height: 275,
  },
  input: {
    backgroundColor: "#256D85",
    color: "#DFF6FF",
    height: 40,
    width: 400,
    margin: 12,
    padding: 10,
    borderRadius: 10,
  },
  logInButton: {
    backgroundColor: "#47B5FF",
    marginHorizontal: 120,
    color: "#06283D",
    fontWeight: "bold",
    fontSize: 25,
    width: 90,
    height: 50,
    marginBottom: 40,
    padding: 10,
    borderRadius: 30,
  },
  signUpText: {
    color: "#47B5FF",
    fontSize: 18,
  },
  footerText: {
    color: "#fff",
    marginHorizontal: 50,
    fontSize: 18,
  },
});

export default SignInMainScreen;
