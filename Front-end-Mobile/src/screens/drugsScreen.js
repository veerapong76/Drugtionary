import {
  VStack,
  Heading,
  Input,
  Icon,
  NativeBaseProvider,
  Modal,
  Button,
  Image,Center
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CardDrug from "../../component/cardDrug";
import DrugList from "../../component/drugList";
import * as ImagePicker from "expo-image-picker";

const DrugScreen = ({ navigation }) => {
  const [textSeach, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [showModal, setShowModal] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setShowModal(true);
      console.log(result.uri);
    }
  };

  const uploadImage = async() => {
    let host = "https://drugtionary.herokuapp.com/predict";
    let filename = pickedImagePath.split('/').pop()
    let match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : `image`

    let formdata = new FormData();
    formdata.append("file", {uri: pickedImagePath,name: filename,type})

    let requestOptions = {
      medthod: 'POST',
      body: formdata,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    let response = await fetch(host, requestOptions);
    let json_data = await response.json()

  }

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.1.7:5000/api/drugs");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function onChangeSearch(text) {
    setSearch(text.substr(0, 20));
  }

  let filterDrugs = data.filter((item) => {
    return item.name.geneticName.indexOf(textSeach) !== -1;
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#F9F8FF",
        paddingTop: "10%",
      }}
    >
      <View style={{ flex: 1, alignItems: "center", margin: 20, width: "90%" }}>
        <NativeBaseProvider>
          <VStack w="100%" alignSelf="center">
            <Input
              onChangeText={(text) => onChangeSearch(text)}
              value={textSeach}
              placeholder="Search Drugs"
              width="100%"
              borderRadius="4"
              py="3"
              px="1"
              fontSize="14"
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="search" />}
                />
              }
              InputRightElement={
                <Icon
                  onPress={() => pickImage()}
                  m="2"
                  mr="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="qr-code-scanner" />}
                />
              }
            />
          </VStack>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>ยาที่ต้องการค้นหาด้วยรูป</Modal.Header>
              <Modal.Body>
                <Center>
                <Image
                  source={{
                    uri: pickedImagePath,
                  }}
                  alt="Alternate Text"
                  size="2xl"
                />
                </Center>
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
                  <Button>ตกลง</Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </NativeBaseProvider>

        <SafeAreaView style={{ flex: 10, marginTop: 15, width: "100%" }}>
          <ScrollView>
            {textSeach != "" &&
              filterDrugs.map((item, key) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("drugScreen", { id: item._id })
                    }
                  >
                    <DrugList drug={item} />
                  </TouchableOpacity>
                );
              })}

            {textSeach == "" &&
              data.map((item, key) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("drugScreen", { id: item._id })
                    }
                  >
                    <DrugList drug={item} />
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default DrugScreen;
