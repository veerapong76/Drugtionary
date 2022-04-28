import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Picker,
  TextInput,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "#F9F8FF",
    flex: 1,

    // Set content's vertical alignment.
    justifyContent: "center",

    // Set content's horizontal alignment.
    alignItems: "center",

    // Set hex color code here.
  },
  logo: {
    width: 300,
    height: 80,
  },
  logo2: {
    width: 230,
    height: 40,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  input2: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#72AAFF",
    padding: 10,
    borderRadius: 10,
    width: 100,
    margin: 12,
  },
  button2: {
    padding: 10,
    margin: 8,
  },
  button3: {},
  text: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const datetimePicker = () => {
  const [visible, setVisible] = useState(false);
  

  const showDateTimePicker = () => {
    setVisible(true);
  };

  const hideDateTimePicker = () => {
    setVisible(false);
  };

  const handleDateTimePicker = (datetime) => {
    var currentTime = Date.now();
    console.log(datetime);
    if (datetime.getTime() < currentTime) {
      Alert.alert("Plese choose future time");
      hideDateTimePicker();
      return;
    }
    hideDateTimePicker();
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <View>
          <Text style={{ color: "black" }}>เพิ่มการแจ้งเตือน</Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        mode="datetime"
        isVisible={visible}
        onConfirm={handleDateTimePicker}
        onCancel={hideDateTimePicker}
      />
      
    </>
  );
};

export default datetimePicker;
