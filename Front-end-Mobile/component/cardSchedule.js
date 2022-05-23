import React, { useState } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  VStack,
  NativeBaseProvider,
  Divider,
  ZStack,
} from "native-base";

const cardSchedule = (prop) => {
  var moment = require("moment");
  return (
    <>
      <NativeBaseProvider>
        <Box
          mb="5"
          bg="white"
          size="20"
          h="110"
          w="100%"
          rounded="2xl"
          shadow={7}

        >
          <HStack>
            <Box w="30%" rounded="xl" bg="white" h="100">
              <AspectRatio w="100%" ratio={16 / 16}>
                <Image
                  rounded="xl"
                  source={{
                    uri: prop.schedule.drugs.images[0],
                  }}
                  alt="test"
                />
              </AspectRatio>
            </Box>
            <Box w="60%" m="5">
              <Text>เวลา: {moment(prop.schedule.date).format("LT")}</Text>
              <Text>ชื่อยา: {prop.schedule.drugs.name.geneticName}</Text>
              <Text>การรับประทาน: {prop.schedule.drugs.uses.beforeMeal ? "ทานก่อนอาหาร" : "ทานหลังอาหาร"}</Text>
              <Text>ปริมาณ: {prop.schedule.detail.dose}</Text>
            </Box>
          </HStack>
        </Box>
      </NativeBaseProvider>
    </>
  );
};

export default cardSchedule;
