import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Divider,
  VStack,
  Input,
  ZStack,Button,Text
} from "native-base";
import CardDrug from "../../component/cardDrug";
import { auth } from "../../firebase.js";

const DrugScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = route.params;
  const axios = require("axios");

  const getData = async () => {
    try {
      const response = await fetch(`http://192.168.1.50:5000/api/drugs/${id}`);
      const json = await response.json();
      setData(json);
      const response2 = await fetch(
        `http://192.168.1.50:5000/api/user/${auth.currentUser.email}`
      );
      const json2 = await response2.json();
      setUser(json2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addDrug = () => {
    user.drugs.push(id);
    const User = {
      drugs: user.drugs,
    };
    axios.put(`http://192.168.1.50:5000/api/user/${user._id}`, User);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9F8FF", paddingTop: "10%" }}>
      
      {isLoading && (
        <NativeBaseProvider>
          <Box bg="#e5e7eb" m="5" pt="3" rounded="2xl">
          <SafeAreaView style={{ width: "100%" }}>
              <ScrollView>
          <Center>  
            <Heading>{data.name.geneticName}</Heading>
            <Center m="5" w="50%" rounded="xl" h="200">
              <AspectRatio w="100%" ratio={20 / 20}>
                <Image
                  rounded="xl"
                  source={{
                    uri: data.images[0],
                  }}
                  alt="test"
                />
              </AspectRatio>
            </Center>
            <Box>
              <Box w="80%">
                <Text fontSize="md">ชื่อสามัญ: {data.name.geneticName}</Text>
                <Text fontSize="md">ชื่อแบรนด์: {data.name.brandName}</Text>
                <Text fontSize="md">รหัสผลิตภัณฑ์: {data.serialNumber}</Text>
                <Text fontSize="md">รายละเอียด : {data.detail}</Text>
                <HStack>
                  <Text fontSize="md">เวลาในการรับประทาน: </Text>
                  {data.uses.morning ? <Text fontSize="md">เช้า, </Text> : <></>}
                  {data.uses.afternoon ? <Text fontSize="md">กลางวัน, </Text> : <></>}
                  {data.uses.evening ? <Text fontSize="md">เย็น, </Text> : <></>}
                  {data.uses.night ? <Text fontSize="md">ก่อนนอน</Text> : <></>}
                </HStack>
                <HStack>
                  <Text fontSize="md">ข้อห้าม: </Text>
                  {data.warnings.pregnant ? <Text fontSize="md">ไม่เหมาะกับคนท้อง, </Text> : <></>}
                  {data.warnings.allergy ? <Text fontSize="md">ไม่เหมาะกับคนเป็นภูมิแพ้, </Text> : <></>}
                  {data.warnings.aged ? <Text fontSize="md">ไม่เหมาะกับผู้สูงวัย, </Text> : <></>}
                  {data.warnings.baby ? <Text fontSize="md">ไม่เหมาะกับเด็ก</Text> : <></>}
                </HStack>
              </Box>
            </Box>
            <HStack alignItems="center" p="5">
              <Button variant="subtle" colorScheme="secondary" shadow={2} onPress={() => navigation.navigate("drugsScreen")}>
                ย้อนกลับ
              </Button>
              <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
              <Divider bg="amber.500" thickness="2" mx="2" orientation="vertical" />
              <Button variant="subtle" shadow={2} onPress={() => addDrug()}>
                เพิ่มยา
              </Button>
            </HStack>
          </Center>
          </ScrollView></SafeAreaView>
          </Box>
        </NativeBaseProvider>
      )}
      
    </View>
  );
};

export default DrugScreen;
