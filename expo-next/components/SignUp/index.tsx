import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Platform,
  View,
  Text,
  TextInput,
  Button,
  GestureResponderEvent,
} from "react-native";
import { MultiSelect, Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { usePostBusiness } from "@state/queries/usePostBusiness";

const MyForm = () => {
  const [formData, setFormData] = useState({
    country: "UK",
    city: "",
    emissionFactor: 0,
    electricityConsumption: "",
    gasConsumption: "",
    existingLCAs: [],
    plannedLCAs: [],
    coffeeQuantity: "",
    coffeeOrigin: "local",
    coffeeCountry: "",
    deliveryFrequency: "",
    deliveryDistance: "",
    transportMode: "road",
    employeeCount: "",
    averageCommute: "",
    commuteMode: "car",
    generalWaste: "",
    recyclableWaste: "",
  });

  const lcaItems = [
    { value: "product_lca", label: "Product LCA" },
    { value: "service_lca", label: "Service LCA" },
    { value: "organizational_lca", label: "Organizational LCA" },
    { value: "carbon_footprint", label: "Carbon Footprint Analysis" },
    { value: "water_footprint", label: "Water Footprint Analysis" },
    { value: "energy_audit", label: "Energy Audit" },
  ];

  const getEmissionFactor = () => {
    // Replace with your logic to fetch emission factor based on the country
    let factor = 0;
    switch (formData.country) {
      case "UK":
        factor = 0.233;
        break;
      case "USA":
        factor = 0.455;
        break;
      case "Germany":
        factor = 0.401;
        break;
      case "France":
        factor = 0.056;
        break;
      default:
        factor = 0.5;
    }
    setFormData((prevData) => ({ ...prevData, emissionFactor: factor }));
  };

  const { mutate, isPending, isError, isSuccess } = usePostBusiness();

  const handleSubmit = (event: GestureResponderEvent) => {
    event.preventDefault();
    // @ts-expect-error - todo type defs
    mutate(formData);
  };

  useEffect(() => {
    getEmissionFactor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.country]);

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ScrollContainer =
    Platform.OS === "web" ? ScrollView : KeyboardAwareScrollView;

  return (
    <ScrollContainer
      className="p-8"
      nestedScrollEnabled={true}
      // TODO
      contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 0 : 320 }}
      extraScrollHeight={20}
    >
      {/* Business Location */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Business Location</Text>
        <Text className="mb-1">Select Your Country:</Text>
        <Dropdown
          style={{
            height: 50,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          data={[
            { label: "United Kingdom", value: "UK" },
            { label: "United States", value: "USA" },
            { label: "Germany", value: "Germany" },
            { label: "France", value: "France" },
            { label: "Other", value: "Other" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select LCAs"
          value={formData.country}
          onChange={(item) => handleInputChange("country", item.value)}
          renderLeftIcon={() => <Text style={{ marginRight: 10 }}>🔍</Text>}
        />

        <Text className="mt-4 mb-1">City (optional):</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          value={formData.city}
          onChangeText={(value) => handleInputChange("city", value)}
          placeholder="Enter your city"
        />
      </View>

      {/* Emission Factor */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Emission Factor</Text>
        <Text className="mb-1">
          Electricity Emission Factor (kg CO₂e per kWh):
        </Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          value={formData.emissionFactor.toString()}
          editable={false}
        />
        <Text className="text-sm mt-1">
          This value is auto-populated based on your location.
        </Text>
      </View>

      {/* Energy Consumption */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Energy Consumption</Text>
        <Text className="mb-1">Electricity Consumption per Annum (kWh):</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.electricityConsumption}
          onChangeText={(value) =>
            handleInputChange("electricityConsumption", value)
          }
        />

        <Text className="mt-4 mb-1">Gas Consumption per Annum (kWh):</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.gasConsumption}
          onChangeText={(value) => handleInputChange("gasConsumption", value)}
        />
      </View>

      {/* Existing LCAs */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">
          Existing Life Cycle Assessments (LCAs)
        </Text>
        <Text className="mb-1">Select LCAs you have conducted:</Text>
        <MultiSelect
          style={{
            height: 50,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          data={lcaItems}
          labelField="label"
          valueField="value"
          placeholder="Select LCAs"
          value={formData.existingLCAs}
          onChange={(value) => handleInputChange("existingLCAs", value)}
          selectedStyle={{ borderRadius: 12 }}
          renderLeftIcon={() => <Text style={{ marginRight: 10 }}>🔍</Text>}
        />
      </View>

      {/* Planned LCAs */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">
          Planned Life Cycle Assessments (LCAs)
        </Text>
        <Text className="mb-1">Select LCAs you plan to conduct:</Text>
        <MultiSelect
          style={{
            height: 50,
            borderColor: "#cccccc",
            backgroundColor: "#f1f5f9",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          data={lcaItems}
          labelField="label"
          valueField="value"
          placeholder="Pledged LCAs"
          value={formData.plannedLCAs}
          onChange={(value) => handleInputChange("plannedLCAs", value)}
          selectedStyle={{ borderRadius: 12 }}
        />
      </View>

      {/* Purchased Goods and Materials */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">
          Purchased Goods and Materials
        </Text>
        <Text className="mb-1">Coffee Purchased (kg per year):</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.coffeeQuantity}
          onChangeText={(value) => handleInputChange("coffeeQuantity", value)}
        />

        <Text className="mt-4 mb-1">Origin of Coffee:</Text>
        <Dropdown
          style={{
            height: 50,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          data={[
            { label: "Local", value: "local" },
            { label: "Domestic", value: "domestic" },
            { label: "Imported", value: "imported" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select LCAs"
          value={formData.coffeeOrigin}
          onChange={(value) => handleInputChange("coffeeOrigin", value.value)}
          renderLeftIcon={() => <Text style={{ marginRight: 10 }}>🔍</Text>}
        />

        {formData.coffeeOrigin === "imported" && (
          <>
            <Text className="mt-4 mb-1">If Imported, Country of Origin:</Text>
            <TextInput
              className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
              value={formData.coffeeCountry}
              onChangeText={(value) =>
                handleInputChange("coffeeCountry", value)
              }
            />
          </>
        )}
      </View>

      {/* Transportation and Logistics */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">
          Transportation and Logistics
        </Text>
        <Text className="mb-1">Deliveries per Month:</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.deliveryFrequency}
          onChangeText={(value) =>
            handleInputChange("deliveryFrequency", value)
          }
        />

        <Text className="mt-4 mb-1">Average Distance per Delivery (km):</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.deliveryDistance}
          onChangeText={(value) => handleInputChange("deliveryDistance", value)}
        />

        <Text className="mt-4 mb-1">Mode of Transport:</Text>

        <Dropdown
          style={{
            height: 50,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          data={[
            { label: "road", value: "road" },
            { label: "sea", value: "sea" },
            { label: "air", value: "air" },
            { label: "rail", value: "rail" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select LCAs"
          value={formData.transportMode}
          onChange={(value) => handleInputChange("transportMode", value.value)}
          renderLeftIcon={() => <Text style={{ marginRight: 10 }}>🔍</Text>}
        />
      </View>

      {/* Employee Commuting */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Employee Commuting</Text>
        <Text className="mb-1">Number of Employees:</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.employeeCount}
          onChangeText={(value) => handleInputChange("employeeCount", value)}
        />

        <Text className="mt-4 mb-1">
          Average One-Way Commute Distance (km):
        </Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.averageCommute}
          onChangeText={(value) => handleInputChange("averageCommute", value)}
        />

        <Text className="mt-4 mb-1">Primary Mode of Commute:</Text>
        <Dropdown
          style={{
            height: 50,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          data={[
            { label: "car", value: "car" },
            { label: "public_transit", value: "public_transit" },
            { label: "bicycle", value: "bicycle" },
            { label: "walking", value: "walking" },
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select LCAs"
          value={formData.commuteMode}
          onChange={(value) => handleInputChange("commuteMode", value.value)}
          renderLeftIcon={() => <Text style={{ marginRight: 10 }}>🔍</Text>}
        />
      </View>

      {/* Waste Generation */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Waste Generation</Text>
        <Text className="mb-1">General Waste (kg per month):</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.generalWaste}
          onChangeText={(value) => handleInputChange("generalWaste", value)}
        />

        <Text className="mt-4 mb-1">Recyclable Waste (kg per month):</Text>
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-[10px] flex-row items-center"
          keyboardType="numeric"
          value={formData.recyclableWaste}
          onChangeText={(value) => handleInputChange("recyclableWaste", value)}
        />
      </View>

      <Button
        title={`${isPending ? "Submitting..." : "Calculate Emissions"}`}
        onPress={handleSubmit}
      />
      {isSuccess && <Text>Form submitted successfully!</Text>}
      {isError && <Text>There was an error submitting the form.</Text>}
    </ScrollContainer>
  );
};

export default MyForm;
