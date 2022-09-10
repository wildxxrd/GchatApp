import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUpButton from './Screens/SignUpScreen/SignUpButton';
import SignUpScreenMain from './Screens/SignUpScreen/SignUpScreenMain';

export default function App() {
  //this return statement is just an example of how we can re use the same component
  return (
    <View style={styles.container}>
      <SignUpScreenMain />
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
