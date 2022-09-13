import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import SignUpInputField from "./SignUpSignInInputField";
import SignUpButton from "./SignUpButton";
import SignUpLoginButton from "./SignUpLoginButton";

const SignUpScreenMain = () => {
  const signUpTitleText = "Sign Up with Email";
  const registerText = "Already registered? ";

  return (
    <View>
      <Image style={style.img} source={require("../../assets/logo.jpg")} />
      <Text style={style.titleText}>
        {signUpTitleText}
        {"\n"}
        {"\n"}
      </Text>
      <Text style={style.inputText}>{"Full Name"}</Text>
      <SignUpInputField placeHolderText="Enter a name" />
      <Text style={style.inputText}>{"Email Address"}</Text>
      <SignUpInputField placeHolderText="Enter your email address" />
      <Text style={style.inputText}>{"Password"}</Text>
      <SignUpInputField placeHolderText="Enter your password" />
      <SignUpButton />
      <Text style={style.footerText}>
        {"\n"}
        {"\n"}
        {registerText}
        <SignUpLoginButton />
        <Text style={style.loginText}></Text>
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  img: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
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
  inputText: {
    fontSize: 16,
    color: "#3D8361",
    fontFamily: "Baskerville-SemiBold",
  },
  loginText: {
    color: "#277BC0",
    fontSize: 16,
    fontFamily: "Baskerville",
  },
  footerText: {
    marginHorizontal: 100,
    fontSize: 16,
    fontFamily: "Baskerville",
  },
});

export default SignUpScreenMain;
