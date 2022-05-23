import React, { useEffect, useState,useReducer } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Skeleton,
  VStack,
  HStack,
  Center,
  NativeBaseProvider,
  Box,
  Image,
  AspectRatio,
  Text,
  Divider,
  ZStack,
  Button,
  Modal,
  FormControl,
  Input,
} from "native-base";
import { auth } from "../../firebase.js";
import CardDrug from "../../component/cardDrug.js";

const ProfileScreen = ({ navigation }) => {
  const [textSeach, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLasname] = useState("");
  const [age, setAge] = useState(0);
  const axios = require("axios");

  

  const getData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.7:5000/api/user/${auth.currentUser.uid}/drugs`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
      console.log(data);
    }
  };

  useEffect(() => {
    getData();
  }, [isLoading]);

  const editUser = () => {
    const User = {
      name: name,
      lastname: lastname,
      age: age,
    };
    axios.put(`http://192.168.1.7:5000/api/user/${data[0]._id}`, User);
    setShowModal(false);
    setLoading(false);
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#F9F8FF",
        paddingTop: "10%",
      }}
    >
      {isLoading && (
        <NativeBaseProvider>
          <Center w="100%">
            <Text fontSize="xl">โปรไฟล์ของฉัน</Text>
            <HStack
              w="90%"
              maxW="400"
              borderWidth="1"
              space={10}
              rounded="2xl"
              _dark={{
                borderColor: "#e5e7eb",
              }}
              _light={{
                borderColor: "#e5e7eb",
              }}
              p="4"
              bg="#0083CD"
              shadow="5"
            >
              <VStack flex="3" space="2">
                <Text fontSize="xl" color="white">
                  ชื่อ-สกุล : {data[0].name} {data[0].lastname}
                </Text>
                <VStack space="1">
                  <Text fontSize="md" color="white">
                    เพศ : {data[0].gender}
                  </Text>
                  <Text fontSize="md" color="white">
                    อายุ : {data[0].age}
                  </Text>
                  <ZStack w="100%">
                    <Box size="20" mt="4" ml="50%" w="60%" h="10" rounded="3xl">
                      <Button shadow={2} onPress={() => setShowModal(true)}>
                        แก้ไขโปรไฟล์
                      </Button>
                    </Box>
                  </ZStack>
                  <Text fontSize="md" color="white">
                    กรุ๊ปเลือด : AB
                  </Text>
                </VStack>
              </VStack>
            </HStack>
          </Center>
          <VStack p="5">
            <Text fontSize="xl">ยาที่กำลังรับประทาน</Text>
          </VStack>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginLeft: 20,
              width: "90%",
            }}
          >
            <SafeAreaView style={{ width: "100%" }}>
              <ScrollView>
                {data[0].drugs.map((item, key) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("drugScreen", { id: item._id })
                      }
                    >
                      <CardDrug drug={item} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </SafeAreaView>
          </View>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>แก้ไขโปรไฟล์</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>ชื่อ</FormControl.Label>
                  <Input onChangeText={setName} value={data[0].name}/>
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>นามสกุล</FormControl.Label>
                  <Input onChangeText={setLasname} value={data[0].lastname}/>
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>อายุ</FormControl.Label>
                  <Input onChangeText={setAge} value={data[0].age}/>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    ยกเลิก
                  </Button>
                  <Button onPress={() => editUser()}>ตกลง</Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </NativeBaseProvider>
      )}
    </View>
  );
};

export default ProfileScreen;
