import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Platform,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Link } from "expo-router";
import MultiSelect from "react-native-multiple-select";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MyForm = () => {
  const [country, setCountry] = useState("UK");
  const [city, setCity] = useState("");
  const [emissionFactor, setEmissionFactor] = useState(0);
  const [electricityConsumption, setElectricityConsumption] = useState("");
  const [gasConsumption, setGasConsumption] = useState("");
  const [existingLCAs, setExistingLCAs] = useState<string[]>([]);
  const [plannedLCAs, setPlannedLCAs] = useState<string[]>([]);
  const [coffeeQuantity, setCoffeeQuantity] = useState("");
  const [coffeeOrigin, setCoffeeOrigin] = useState("local");
  const [coffeeCountry, setCoffeeCountry] = useState("");
  const [deliveryFrequency, setDeliveryFrequency] = useState("");
  const [deliveryDistance, setDeliveryDistance] = useState("");
  const [transportMode, setTransportMode] = useState("road");
  const [employeeCount, setEmployeeCount] = useState("");
  const [averageCommute, setAverageCommute] = useState("");
  const [commuteMode, setCommuteMode] = useState("car");
  const [generalWaste, setGeneralWaste] = useState("");
  const [recyclableWaste, setRecyclableWaste] = useState("");

  const lcaItems = [
    { id: "product_lca", name: "Product LCA" },
    { id: "service_lca", name: "Service LCA" },
    { id: "organizational_lca", name: "Organizational LCA" },
    { id: "carbon_footprint", name: "Carbon Footprint Analysis" },
    { id: "water_footprint", name: "Water Footprint Analysis" },
    { id: "energy_audit", name: "Energy Audit" },
  ];

  const getEmissionFactor = () => {
    // Replace with your logic to fetch emission factor based on the country
    let factor = 0;
    switch (country) {
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
    setEmissionFactor(factor);
  };

  useEffect(() => {
    getEmissionFactor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const handleSubmit = () => {
    // Handle form submission logic
  };

  const ScrollContainer =
    Platform.OS === "web" ? ScrollView : KeyboardAwareScrollView;

  return (
    <ScrollContainer
      className="p-4"
      nestedScrollEnabled={true}
      extraScrollHeight={20}
    >
      {/* Business Location */}
      <Link href="/search">Skip to main map</Link>

      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Business Location</Text>
        <Text className="mb-1">Select Your Country:</Text>
        <RNPickerSelect
          onValueChange={(value) => setCountry(value)}
          items={[
            { label: "United Kingdom", value: "UK" },
            { label: "United States", value: "USA" },
            { label: "Germany", value: "Germany" },
            { label: "France", value: "France" },
            { label: "Other", value: "Other" },
          ]}
          value={country}
          style={{
            inputAndroid: { color: "black" },
            inputIOS: { color: "black" },
          }}
        />

        <Text className="mt-4 mb-1">City (optional):</Text>
        <TextInput
          className="border p-2"
          value={city}
          onChangeText={setCity}
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
          className="border p-2 bg-gray-200"
          value={emissionFactor.toString()}
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
          className="border p-2"
          keyboardType="numeric"
          value={electricityConsumption}
          onChangeText={setElectricityConsumption}
        />

        <Text className="mt-4 mb-1">Gas Consumption per Annum (kWh):</Text>
        <TextInput
          className="border p-2"
          keyboardType="numeric"
          value={gasConsumption}
          onChangeText={setGasConsumption}
        />
      </View>

      {/* Existing LCAs */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">
          Existing Life Cycle Assessments (LCAs)
        </Text>
        <Text className="mb-1">Select LCAs you have conducted:</Text>
        <MultiSelect
          items={lcaItems.slice(0, 5)}
          // nestedScrollEnabled={true}
          uniqueKey="id"
          onSelectedItemsChange={setExistingLCAs}
          selectedItems={existingLCAs}
          selectText="Select LCAs"
          searchInputPlaceholderText="Search LCAs..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#000"
          selectedItemTextColor="#000"
          selectedItemIconColor="#000"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#000" }}
          submitButtonColor="#48BB78"
          submitButtonText="Submit"
        />
      </View>

      {/* Planned LCAs */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">
          Planned Life Cycle Assessments (LCAs)
        </Text>
        <Text className="mb-1">Select LCAs you plan to conduct:</Text>
        <MultiSelect
          items={lcaItems}
          uniqueKey="id"
          onSelectedItemsChange={setPlannedLCAs}
          selectedItems={plannedLCAs}
          selectText="Select LCAs"
          searchInputPlaceholderText="Search LCAs..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#000"
          selectedItemTextColor="#000"
          selectedItemIconColor="#000"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#000" }}
          submitButtonColor="#48BB78"
          submitButtonText="Submit"
        />
      </View>

      {/* Purchased Goods and Materials */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">
          Purchased Goods and Materials
        </Text>
        <Text className="mb-1">Coffee Purchased (kg per year):</Text>
        <TextInput
          className="border p-2"
          keyboardType="numeric"
          value={coffeeQuantity}
          onChangeText={setCoffeeQuantity}
        />

        <Text className="mt-4 mb-1">Origin of Coffee:</Text>
        <RNPickerSelect
          onValueChange={(value) => setCoffeeOrigin(value)}
          items={[
            { label: "Local", value: "local" },
            { label: "Domestic", value: "domestic" },
            { label: "Imported", value: "imported" },
          ]}
          value={coffeeOrigin}
          style={{
            inputAndroid: { color: "black" },
            inputIOS: { color: "black" },
          }}
        />

        {coffeeOrigin === "imported" && (
          <>
            <Text className="mt-4 mb-1">If Imported, Country of Origin:</Text>
            <TextInput
              className="border p-2"
              value={coffeeCountry}
              onChangeText={setCoffeeCountry}
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
          className="border p-2"
          keyboardType="numeric"
          value={deliveryFrequency}
          onChangeText={setDeliveryFrequency}
        />

        <Text className="mt-4 mb-1">Average Distance per Delivery (km):</Text>
        <TextInput
          className="border p-2"
          keyboardType="numeric"
          value={deliveryDistance}
          onChangeText={setDeliveryDistance}
        />

        <Text className="mt-4 mb-1">Mode of Transport:</Text>

        <RNPickerSelect
          onValueChange={(value) => setTransportMode(value)}
          items={[
            { label: "road", value: "road" },
            { label: "sea", value: "sea" },
            { label: "air", value: "air" },
            { label: "rail", value: "rail" },
          ]}
          value={transportMode}
          style={{
            inputAndroid: { color: "black" },
            inputIOS: { color: "black" },
          }}
        />
      </View>

      {/* Employee Commuting */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Employee Commuting</Text>
        <Text className="mb-1">Number of Employees:</Text>
        <TextInput
          className="border p-2"
          keyboardType="numeric"
          value={employeeCount}
          onChangeText={setEmployeeCount}
        />

        <Text className="mt-4 mb-1">
          Average One-Way Commute Distance (km):
        </Text>
        <TextInput
          className="border p-2"
          keyboardType="numeric"
          value={averageCommute}
          onChangeText={setAverageCommute}
        />

        <Text className="mt-4 mb-1">Primary Mode of Commute:</Text>
        <RNPickerSelect
          onValueChange={(value) => setCommuteMode(value)}
          items={[
            { label: "car", value: "car" },
            { label: "public_transit", value: "public_transit" },
            { label: "bicycle", value: "bicycle" },
            { label: "walking", value: "walking" },
          ]}
          value={commuteMode}
          style={{
            inputAndroid: { color: "black" },
            inputIOS: { color: "black" },
          }}
        />
      </View>

      {/* Waste Generation */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Waste Generation</Text>
        <Text className="mb-1">General Waste (kg per month):</Text>
        <TextInput
          className="border p-2"
          keyboardType="numeric"
          value={generalWaste}
          onChangeText={setGeneralWaste}
        />

        <Text className="mt-4 mb-1">Recyclable Waste (kg per month):</Text>
        <TextInput
          className="border p-2"
          keyboardType="numeric"
          value={recyclableWaste}
          onChangeText={setRecyclableWaste}
        />
      </View>

      {/* Submit Button */}
      <Button title="Calculate Emissions" onPress={handleSubmit} />
    </ScrollContainer>
  );
};

export default MyForm;
