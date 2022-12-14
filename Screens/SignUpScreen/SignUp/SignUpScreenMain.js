import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { firebase } from "../../../config";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const SignUpScreenMain = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const registerUser = async (email, password, firstName, lastName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password, firstName, lastName)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "ggchat-f307f.firebaseapp.com/",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
                uri,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signUpTitleText = "Sign Up with Email";
  const registerText = "Already registered? ";

  return (
    <View style={style.container}>
      <Image
        style={style.img}
        source={require("../../../assets/ggc_logo.png")}
      />
      <Text style={style.titleText}>{signUpTitleText}</Text>
      <View>
        <TextInput
          style={style.input}
          placeholder="First Name"
          placeholderTextColor="#DFF6FF"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={style.input}
          placeholder="Last Name"
          placeholderTextColor="#DFF6FF"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={style.input}
          placeholder="Email"
          placeholderTextColor="#DFF6FF"
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={style.input}
          placeholder="Password"
          placeholderTextColor="#DFF6FF"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName, lastName)}
      >
        <Text style={style.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={style.footerText}>
        {"\n\n"}
        {registerText}
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text style={style.loginText}>Login</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    backgroundColor: "#000000",
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
  titleText: {
    color: "#47B5FF",
    fontSize: 30,
    marginHorizontal: 20,
    fontWeight: "bold",
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
  signUpText: {
    backgroundColor: "#47B5FF",
    marginHorizontal: 120,
    color: "#06283D",
    fontWeight: "bold",
    fontSize: 25,
    width: 110,
    height: 50,
    marginBottom: 40,
    padding: 10,
    borderRadius: 100,
  },
  loginText: {
    color: "#47B5FF",
    fontSize: 20,
  },
  footerText: {
    color: "#fff",
    marginHorizontal: 100,
    fontSize: 20,
  },
});

export default SignUpScreenMain;
