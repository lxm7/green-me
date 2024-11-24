import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import IntroScreen from "@app/intro";

// Mock the expo-router useRouter hook
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

test("displays key text elements", () => {
  const { getByText } = render(<IntroScreen />);

  // Check for the main heading
  expect(getByText("Welcome to Green Me")).toBeTruthy();

  // Check for subheadings and descriptions
  expect(
    getByText("Get rewarded for where you buy local or online products."),
  ).toBeTruthy();

  expect(
    getByText(/Whether you're a seller or consumer, everyone can earn tokens/i),
  ).toBeTruthy();

  // Check for 'How it works' section
  expect(getByText("How it works")).toBeTruthy();
});

test("navigates to '/sign-up' when 'Let's do this' button is pressed", () => {
  const { getByText } = render(<IntroScreen />);
  const button = getByText("Lets do this");

  // Simulate button press
  fireEvent.press(button);

  // Expect navigation to have been called
  // You may need to adjust this based on your navigation implementation
  const router = useRouter();
  expect(router.push).toHaveBeenCalledWith("/sign-up");
});
