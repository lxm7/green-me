import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";

export async function submitForm(formData: Record<string, string>) {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/business`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export function usePostBusiness() {
  return useMutation({
    mutationFn: (formData) =>
      submitForm(formData as unknown as Record<string, string>),
    onSuccess: async () => {
      setTimeout(() => {
        router.replace("/search");
      }, 1000);
    },
    onSettled: async () => {
      console.info("Settled!");
    },
  });
}
