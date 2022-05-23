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
  TextInput,Alert
} from "react-native";
import { auth } from "../../firebase.js";
import { Switch } from "react-native-switch";
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

const ScheduleScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [drug, setDrug] = useState("");
  const [drugName, setDrugName] = useState("");
  const [dosage, setDosage] = useState();
  const [date, setDate] = useState(new Date(Date.now()) );
  const [timeVisible, setTimeVisible] = useState(false);

  const axios = require("axios");

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
        dose: dosage
      },
      userId: auth.currentUser.uid
      
    };
    
    axios.post("http://192.168.1.7:5000/api/schedule", Schedule)
    setModalVisible(!modalVisible)
    setLoading(false)
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
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <View>
                <Text style={{ color: "black" }}>เพิ่มการแจ้งเตือน</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{
              flex: 1,
              alignItems: "center",
              width: "100%",
            }}>
      {isLoading && (
        <SafeAreaView style={{ width: "100%" }}>
          <ScrollView>
            {schedule.map((item, key) => {
              return (
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    width: "100%",
                    padding: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      backgroundColor: "white",
                      width: "100%",
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: "white",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.32,
                      shadowRadius: 5.46,

                      elevation: 9,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        width: "80%",
                      }}
                    >
                      <View style={{ flex: 2, paddingRight: 10 }} key={key}>
                        <Text style={{ color: "black", fontSize: 15 }}>
                          เวลา: {moment(item.date).format("LT")}
                        </Text>
                        <Text style={{ color: "black", fontSize: 15 }}>
                          ยา: {item.drugs.name.geneticName}
                        </Text>
                        <Text style={{ color: "black", fontSize: 15 }}>
                          {item.detail.beforeMeal ? (
                            <Text>ทานก่อนอาหาร</Text>
                          ) : (
                            <Text>ทานหลังอาหาร</Text>
                          )}
                        </Text>
                        <Text style={{ color: "black", fontSize: 15 }}>
                          ทาน: {item.detail.dose} เม็ด
                        </Text>
                      </View>
                      <View>
                        <Switch value={item.enable} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
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
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => createSchedule()}>
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
