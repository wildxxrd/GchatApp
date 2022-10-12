import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {View,Text,Picker, DropDownPicker} from 'react-native';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


function SettingsButton (){
  return (
      <Dropdown autoClose={false}>
        <Dropdown.Toggle id="dropdown-basic" variant="success">
          <SimpleLineIcons name="settings" size={50}/>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another Option Here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>


  );
}

// function SplitBasicExample() {
//   return (
//     <Dropdown as={ButtonGroup}>
//       <Button variant="success">Split Button</Button>

//       <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }

// export default SplitBasicExample;
export default SettingsButton;