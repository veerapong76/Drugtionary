import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Text,
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
  ZStack,
} from "native-base";
import CardDrug from "../../component/cardDrug";
import { auth } from "../../firebase.js";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.50:5000/api/user/${auth.currentUser.uid}/drugs`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    getData();
  }, [isLoading]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#F9F8FF",
        paddingTop: "10%",
      }}
    >
      <NativeBaseProvider>
        <Box m="5">
          <Heading size="xl">การแจ้งเตือนล่าสุด</Heading>
          <Box>
            <ZStack mt="2">
              <Box
                bg="#C3EAFF"
                size="20"
                mt="4"
                w="100%"
                h="150"
                rounded="3xl"
                shadow={3}
              />
              <Box
                bg="#5BC2FD"
                mt="2"
                size="20"
                w="100%"
                h="150"
                rounded="3xl"
                shadow={5}
              />
              <Box
                bg="#0083CD"
                size="20"
                h="150"
                w="100%"
                rounded="3xl"
                shadow={7}
              >
                <Center>
                  <Text fontSize="5xl" color="white">18.00 น.</Text>
                </Center>
              </Box>
            </ZStack>
          </Box>
        </Box>
        <Box mt="40%" m="5">
          <Heading size="xl">ยาที่กำลังรับประทานอยู่</Heading>
        </Box>
      </NativeBaseProvider>
      <View style={{ flex: 1, alignItems: "center", margin: 20, width: "90%" }}>
        <SafeAreaView style={{ marginTop: 15, width: "100%" }}>
          <ScrollView>
            {isLoading &&
              data[0].drugs.map((item, key) => {
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
    </View>
  );
};

export default HomeScreen;
