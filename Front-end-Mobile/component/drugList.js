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
  NativeBaseProvider,Divider
} from "native-base";

const drugList = (prop) => {
  return (
    <>
      <NativeBaseProvider>
        <Box alignItems="center" pb="5">
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
            shadow="9"
          >
            <Box>
              <AspectRatio w="100%" ratio={16 / 10}>
                <Image
                  source={{
                    uri: prop.drug.images[0]
                  }}
                  alt="image"
                />
              </AspectRatio>
              <Center
                bg="violet.500"
                _dark={{
                  bg: "violet.400",
                }}
                _text={{
                  color: "warmGray.50",
                  fontWeight: "700",
                  fontSize: "xs",
                }}
                position="absolute"
                bottom="0"
                px="3"
                py="1.5"
              >
                PHOTOS
              </Center>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {prop.drug.name.geneticName}
                </Heading>
              </Stack>
              <Text fontWeight="500" fontSize="md" numberOfLines={3}>
                {prop.drug.detail}
              </Text>
            </Stack>
          </Box>
        </Box>
      </NativeBaseProvider>
      
    </>
  );
};

export default drugList;
