import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {View,Text,Picker, DropDownPicker} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import React from 'react';

const SettingsButton = () => {

  const [selected, setSelected] = React.useState("");

  const data = [
    {key : "1", value:'profile'},
    {key : "2", value:'Logout'}
  ]



  return (
    <View>
      <SimpleLineIcons name="settings" function size={50}/>
      <SelectList data = {data} setSelected={setSelected} />

    </View>
  );
};

export default SettingsButton;