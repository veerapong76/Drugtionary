import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable,
  Picker,
  TextInput,
  Alert,
} from "react-native";
import { auth } from "../../firebase.js";
import { Switch } from "react-native-switch";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CardSchedule from "../../component/cardSchedule.js";
import * as Notifications from "expo-notifications";
import notificationControll from "../../component/notificationControll.js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

const ScheduleScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [drug, setDrug] = useState("");
  const [dosage, setDosage] = useState();
  const [date, setDate] = useState(new Date(Date.now()));
  const [timeVisible, setTimeVisible] = useState(false);

  const axios = require("axios");

  function schedulePushNotification() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "แจ้งเตือนรับประทานยา",
        body: "คุณต้องรับประทานยา Paracetamol จำนวน 1 เม็ด",
      },
      trigger: { hour:date.getHours(),minute: date.getMinutes(),repeats:true },
    });
  }

  const showDateTimePicker = () => {
    setTimeVisible(true);
  };

  const hideDateTimePicker = () => {
    setTimeVisible(false);
  };

  const handleDateTimePicker = (datetime) => {
    var currentTime = Date.now();
    console.log(datetime);
    if (datetime.getTime() < currentTime) {
      Alert.alert("Plese choose future time");
      hideDateTimePicker();
      return;
    }
    setDate(new Date(datetime));
    hideDateTimePicker();
  };

  var moment = require("moment");

  const getData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.7:5000/api/user/${auth.currentUser.uid}/drugs&schedule`
      );
      const json = await response.json();
      setData(json);

      const response2 = await fetch(
        `http://192.168.1.7:5000/api/schedule/user/${auth.currentUser.uid}`
      );
      const json2 = await response2.json();
      setSchedule(json2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  const createSchedule = () => {
    const Schedule = {
      date: date,
      enable: true,
      drugs: drug,
      detail: {
        dose: dosage,
      },
      userId: auth.currentUser.uid,
    };

    axios.post("http://192.168.1.7:5000/api/schedule", Schedule);
    schedulePushNotification()
    setModalVisible(!modalVisible);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [isLoading]);

  return (
    <View
      style={{
        flex: 1,
        margin: 7,
        backgroundColor: "#F9F8FF",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
        padding: 20,
        paddingTop: "10%",
      }}
    >
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>การแจ้งเตือน</Text>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View>
                <Text style={{ color: "black" }}>เพิ่มการแจ้งเตือน</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        {isLoading && (
          <SafeAreaView style={{ width: "100%" }}>
            <ScrollView>
              {schedule.map((item, key) => {
                return <CardSchedule schedule={item} />;
              })}
            </ScrollView>
          </SafeAreaView>
        )}
      </View>
      <View style={{ flex: 0.1 }} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>เพิ่มการแจ้งเตือน</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <TouchableOpacity onPress={() => showDateTimePicker()}>
                <Text style={{ fontSize: 18 }}>
                  เวลา {moment(date).format("LT")}
                </Text>
              </TouchableOpacity>
            </View>

            <Picker
              style={{ height: 50, width: 150 }}
              onValueChange={(value, itemIndex) => setDrug(value)}
            >
              {isLoading &&
                data[0].drugs.map((item) => {
                  return (
                    <Picker.Item
                      label={item.name.geneticName}
                      value={item._id}
                    />
                  );
                })}
            </Picker>
            <TextInput
              type="email"
              onChangeText={setDosage}
              style={styles.input2}
              placeholder={"เม็ด/ครั้ง"}
            />

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>ยกเลิก</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => createSchedule()}
              >
                <Text style={styles.textStyle}>เพิ่มแจ้งเตือน</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        mode="datetime"
        isVisible={timeVisible}
        onConfirm={handleDateTimePicker}
        onCancel={hideDateTimePicker}
      />
    </View>
  );
};

export default ScheduleScreen;
