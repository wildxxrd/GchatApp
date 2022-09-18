
import { StyleSheet, Text, View, TextInput } from 'react-native';

const SignUpInputField =(text) => {
  return (
    <View>
    <TextInput style={styles.input} placeholderTextColor='black' placeholder={text.placeHolderText}/>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#DFDFDE',
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 10,
  },
});

export default SignUpInputField;
