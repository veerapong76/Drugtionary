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

const cardDrug = (prop) => {
  return (
    <>
      <NativeBaseProvider>
        <Box
          mb="5"
          bg="#e5e7eb"
          size="20"
          h="110"
          w="100%"
          rounded="2xl"
          shadow={7}

        >
          <HStack>
            <Box w="30%" rounded="xl" bg="primary.500" h="100">
              <AspectRatio w="100%" ratio={16 / 16}>
                <Image
                  rounded="xl"
                  source={{
                    uri: prop.drug.images[0],
                  }}
                  alt="test"
                />
              </AspectRatio>
            </Box>
            <Box w="60%" m="5">
              <Text>ชื่อสามัญ: {prop.drug.name.geneticName}</Text>
              <Text>รหัสผลิตภัณฑ์: {prop.drug.serialNumber}</Text>
              <Text>ปริมาณ: {prop.drug.dosage}</Text>
            </Box>
          </HStack>
        </Box>
      </NativeBaseProvider>
    </>
  );
};

export default cardDrug;
