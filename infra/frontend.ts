import { api } from "./api";
// https://sst.dev/docs/component/aws/static-site/#staticsiteargs
export const web = new sst.aws.StaticSite("Web", {
  path: "expo-next",
  // no generated hash for mp4 asset in the build even tho metro is flagged to use mp4??
  build: {
    command: "npm run build",
    output: "dist",
  },
  environment: {
    // API_URL: api.url,
    EXPO_PUBLIC_API_URL: api.url,
    EXPO_PUBLIC_GOOGLE_AUTH_WEB_APP_ID: process.env.GOOGLE_AUTH_WEB_APP_ID,
    EXPO_PUBLIC_GOOGLE_AUTH_ANDROID_APP_ID:
      process.env.GOOGLE_AUTH_ANDROID_APP_ID,
    EXPO_PUBLIC_GOOGLE_AUTH_IOS_APP_ID: process.env.GOOGLE_AUTH_IOS_APP_ID,
    EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_ANDROID:
      process.env.GOOGLE_MAPS_API_KEY_ANDROID,
    EXPO_PUBLIC_CLIMATIQ_API_KEY: process.env.CLIMATIQ_API_KEY,
    EXPO_PUBLIC_MAPTILERS_API_KEY: process.env.MAPTILERS_API_KEY,
    EXPO_PUBLIC_SUPABASE_PROJECT_ID: process.env.SUPABASE_PROJECT_ID,
    EXPO_PUBLIC_SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
    EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY:
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  // domain: {
  //   name: "my-app.com",
  //   redirects: ["www.my-app.com"],
  //   cert: "arn:aws:acm:us-east-1:112233445566:certificate/3a958790-8878-4cdc-a396-06d95064cf63"
  // }
  // runtime: "nodejs20.x",
  // bind:[] db's for nextJS if we should call direct to db from getServerSideProps or getStaticProps
});
