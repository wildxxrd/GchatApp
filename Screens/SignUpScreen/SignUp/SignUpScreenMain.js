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
    <View>
      <Image style={style.img} source={require("../../../assets/logo.jpg")} />
      <Text style={style.titleText}>{signUpTitleText}</Text>
      <View>
        <TextInput
          style={style.input}
          placeholder="First Name"
          placeholderTextColor="black"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={style.input}
          placeholder="Last Name"
          placeholderTextColor="black"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={style.input}
          placeholder="Email"
          placeholderTextColor="black"
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={style.input}
          placeholder="Password"
          placeholderTextColor="black"
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
        {"\n"}
        {registerText}
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text style={style.loginText}>Login</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  img: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 60,
    marginBottom: 20,
    width: 250,
    height: 275,
  },
  titleText: {
    fontSize: 30,
    marginHorizontal: 20,
    fontWeight: "bold",
    fontFamily: "Baskerville-SemiBold",
  },
  input: {
    backgroundColor: "#DFDFDE",
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 10,
  },
  signUpText: {
    marginHorizontal: 170,
    color: "#277BC0",
    fontSize: 20,
    fontFamily: "Baskerville-Bold",
  },
  loginText: {
    color: "#277BC0",
    fontSize: 20,
    fontFamily: "Baskerville-Bold",
  },
  footerText: {
    marginHorizontal: 100,
    fontSize: 20,
    fontFamily: "Baskerville",
  },
});

export default SignUpScreenMain;
