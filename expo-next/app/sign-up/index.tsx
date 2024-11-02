import { View } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Text } from "@components/ui/text";
import SignUp from "@components/SignUp";
import GoogleSignIn from "@app/sign-up/components/GoogleSignIn";

type UserType = "consumer" | "business";

function App() {
  const [userType, setUserType] = useState<UserType>("consumer");

  const handleModeChange = (value: string) => {
    setUserType(value as UserType);
  };

  return (
    <View className="flex-1">
      <View className="flex-row mb-4">
        <View className="flex-1">
          <Link
            className="mt-6 mb-6 text-center text-xl font-bold"
            href="/search"
          >
            Skip to main map
          </Link>

          <Tabs
            value={userType}
            onValueChange={handleModeChange}
            className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
          >
            <TabsList className="flex-row w-full">
              <TabsTrigger value="consumer" className="flex-1">
                <Text>consumer</Text>
              </TabsTrigger>
              <TabsTrigger value="business" className="flex-1">
                <Text>business</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="consumer">
              <View className={"mt-6 justify-center items-center"}>
                <GoogleSignIn />
              </View>
            </TabsContent>
            <TabsContent value="business">
              <SignUp />
            </TabsContent>
          </Tabs>
        </View>
      </View>
    </View>
  );
}

export default App;
