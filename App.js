import { StatusBar } from 'expo-status-bar';
import SignUpInputField from './Components/SignUpScreen/SignUpInputField';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  //this return statement is just an example of how we can re use the same component
  return (
    <View style={styles.container}>
      <SignUpInputField name="Enter a Name"/>
      <SignUpInputField name="Enter Your Email"/>
      <SignUpInputField name="Enter Your Password"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
