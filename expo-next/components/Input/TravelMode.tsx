import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Text } from "@components/ui/text";
import { View } from "react-native";
import { TravelMode } from "@components/MapContainer/types";

interface TravelModeSelectorProps {
  travelMode: TravelMode;
  onModeChange: (value: string) => void;
}

const TravelModeSelector: React.FC<TravelModeSelectorProps> = ({
  travelMode,
  onModeChange,
}) => {
  return (
    <View className="flex-row mb-4">
      <View className="flex-1">
        <Tabs
          value={travelMode}
          onValueChange={onModeChange}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="walk" className="flex-1">
              <Text>walk</Text>
            </TabsTrigger>
            <TabsTrigger value="drive" className="flex-1">
              <Text>drive</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="walk" />

          <TabsContent value="drive" />
        </Tabs>
      </View>
    </View>
  );
};

export default React.memo(TravelModeSelector);
