
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SignUpInputField =(text) => {
  return (
    <View>
    <TextInput style={styles.input} placeholder={text.name}></TextInput>
    <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EFEFEF',
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 10,
  },
});

export default SignUpInputField;
