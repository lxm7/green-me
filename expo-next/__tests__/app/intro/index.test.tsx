import React, { ReactElement, ReactNode } from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import IntroScreen from "@app/intro";

const mockPush = jest.fn();

jest.mock("expo-router", () => {
  const React = require("react");
  const { Pressable } = require("react-native");

  return {
    useRouter: () => ({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
    }),
    Link: ({
      children,
      href,
      asChild,
      ...props
    }: {
      children: ReactElement;
      href: string;
      asChild: boolean;
    }) => {
      if (asChild) {
        return React.cloneElement(children, {
          ...props,
          onPress: () => {
            mockPush(href);
            if (children.props.onPress) children.props.onPress();
          },
        });
      } else {
        return (
          <Pressable
            {...props}
            onPress={() => {
              mockPush(href);
            }}
          >
            {children}
          </Pressable>
        );
      }
    },
    Stack: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

beforeEach(() => {
  mockPush.mockClear();
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

test("navigates to '/sign-up' when 'Let's do this' button is pressed", async () => {
  render(<IntroScreen />);
  const button = screen.getByText("Lets do this");
  const user = userEvent.setup();
  await user.press(button);
  expect(mockPush).toHaveBeenCalledWith("/sign-up");
});
