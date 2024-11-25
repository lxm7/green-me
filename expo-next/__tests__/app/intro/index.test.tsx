import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import IntroScreen from "@app/intro";

jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Link: ({ children, href, asChild, ...props }) => {
      return <Text {...props}>{children}</Text>;
    },
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    Stack: ({ children }) => {
      return <>{children}</>;
    },
  };
});

test("displays key text elements", () => {
  render(<IntroScreen />);

  // Check for the main heading
  expect(screen.getByText("Welcome to Green Me")).toBeTruthy();

  // Check for subheadings and descriptions
  expect(
    screen.getByText(
      "Get rewarded for where you buy local or online products.",
    ),
  ).toBeTruthy();

  expect(
    screen.getByText(
      /Whether you're a seller or consumer, everyone can earn tokens/i,
    ),
  ).toBeTruthy();

  // Check for 'How it works' section
  expect(screen.getByText("How it works")).toBeTruthy();
});

test("navigates to '/sign-up' when 'Let's do this' button is pressed", () => {
  render(<IntroScreen />);
  const button = screen.getByText("Lets do this");

  // Simulate button press
  fireEvent.press(button);

  const router = useRouter();
  console.log({ router });
  expect(router.push).toHaveBeenCalledWith("/sign-up");
});
