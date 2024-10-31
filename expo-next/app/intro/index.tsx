import React from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Svg, Path } from "react-native-svg";
import { Button } from "@components/ui/button";

const IntroScreen = () => {
  return (
    <ScrollView>
      <View className="relative flex flex-1 size-full min-h-screen flex-col bg-white justify-between group/design-root overflow-x-hidden">
        <View>
          <ImageBackground
            source={{
              uri: "https://cdn.usegalileo.ai/stability/d3bb7809-2b9e-46b6-9f13-fa8414b898d9.png",
            }}
            className="relative flex items-center justify-center bg-[#111418] bg-cover bg-center aspect-video"
          >
            <TouchableOpacity className="flex shrink-0 items-center justify-center rounded-full size-16 bg-black/40 text-white">
              <View
                className="text-inherit"
                data-icon="Play"
                data-size="24px"
                data-weight="fill"
              >
                <Svg
                  // xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <Path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
                </Svg>
              </View>
            </TouchableOpacity>
          </ImageBackground>
          <View className="flex items-center bg-white p-4 pb-2 justify-between">
            <Text className="text-[#111418] text-[28px] font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12 pr-12">
              Welcome to Green Me
            </Text>
          </View>
          <Text className="text-[#111418] tracking-light text-[18px] font-bold leading-tight px-4 text-center pb-3 pt-5">
            Get rewarded for where you buy local or online products.
          </Text>
          <Text className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
            Whether you're a seller or consumer, everyone can earn tokens for
            buying and selling items that are environmentally conscious. The
            greener your choices, the more tokens you will collect.
          </Text>
          <Text className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            How it works
          </Text>
          <View className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
            <View className="flex flex-col items-center gap-1 pt-5">
              <View className="size-2 rounded-full bg-[#111418]" />
              <View className="w-[1.5px] bg-[#dce0e5] h-4 grow" />
            </View>
            <View className="flex flex-1 flex-col pt-3 pb-5">
              <Text className="text-[#111418] text-base font-medium leading-normal">
                Search for local or online item
              </Text>
            </View>
            <View className="flex flex-col items-center gap-1">
              <View className="w-[1.5px] bg-[#dce0e5] h-4" />
              <View className="size-2 rounded-full bg-[#111418]" />
              <View className="w-[1.5px] bg-[#dce0e5] h-4 grow" />
            </View>
            <View className="flex flex-1 flex-col pt-3 pb-5">
              <Text className="text-[#111418] text-base font-medium leading-normal">
                Once purchased/received this will be logged optionally at the
                users consent.
              </Text>
            </View>
            <View className="flex flex-col items-center gap-1 pb-3">
              <View className="w-[1.5px] bg-[#dce0e5] h-4" />
              <View className="size-2 rounded-full bg-[#111418]" />
              <View className="w-[1.5px] bg-[#dce0e5] h-full" />
            </View>
            <View className="flex flex-1 flex-col pt-3 pb-5">
              <Text className="text-[#111418] text-base font-medium leading-normal">
                A breakdown of token reward is shown during the filters and
                search and send to your Metamask or other reputable and secure
                web3 wallet
              </Text>
            </View>
            <View className="flex flex-col items-center gap-1 pb-3">
              <View className="w-[1.5px] bg-[#dce0e5] h-4" />
              <View className="size-2 rounded-full bg-[#111418]" />
              <View className="w-[1.5px] bg-[#dce0e5] h-full" />
            </View>
            <View className="flex flex-1 flex-col pt-3 pb-5">
              <Text className="text-[#111418] text-base font-medium leading-normal">
                This token has a 1:1 mapping of the amount of Co2 emissions tons
                that we can get away with to stay under the 2 degrees global
                warming by 2050. Current estimates mean there are 1 trillion
                tokens : 1 trillion mega tons of emissions to track and reduce
                via the insuance of this token, similar to carbon credits. The
                more tokens you earn, the greater impact we may have on this
                seemingly impossible feat
              </Text>
            </View>
            <View className="flex flex-col items-center gap-1 pb-3">
              <View className="w-[1.5px] bg-[#dce0e5] h-4" />
              <View className="size-2 rounded-full bg-[#111418]" />
            </View>
            <View className="flex flex-1 flex-col pt-3 pb-5">
              <Text className="text-[#111418] text-base font-medium leading-normal">
                This example of a web3 wallet in the chrome browser (a few
                simple user friendly instructions later for those unware of the
                basics of operating web3 wallets)
              </Text>
            </View>
          </View>
          <View className="flex flex-1 flex-col pl-16 pr-8 pb-10">
            <Link href="/sign-up" asChild>
              <Button className="mt-2 bg-purple-500 py-2 px-4 rounded text-center">
                <Text className="text-white ">Lets do this</Text>
              </Button>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default IntroScreen;
