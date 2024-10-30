import { View } from "react-native";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Text } from "@components/ui/text";
import SignUp from "@components/SignUp";

function App() {
  return (
    <View className="flex-1">
      <View className="flex-row mb-4">
        <View className="flex-1">
          <Tabs
            value={"Consumer"}
            onValueChange={() => null}
            className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
          >
            <TabsList className="flex-row w-full">
              <TabsTrigger value="walk" className="flex-1">
                <Text>Consumer</Text>
              </TabsTrigger>
              <TabsTrigger value="drive" className="flex-1">
                <Text>Business</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="walk" />

            <TabsContent value="drive" />
          </Tabs>
        </View>
      </View>
      <SignUp />
    </View>
  );
}

export default App;
