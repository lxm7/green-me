import { api } from "./api";

export const web = new sst.aws.StaticSite("Web", {
  path: "expo-next",
  // no generated hash for mp4 asset in the build even tho metro is flagged to use mp4??
  build: {
    command: "npm run clean && npm run build",
    output: "dist",
  },
  // environment - doesnt require permissions, more static value
  environment: {
    NEXT_PUBLIC_API_URL: api.url,
  },
  // runtime: "nodejs20.x",
  // bind mainDb for nextJS if we should call direct to db from getServerSideProps or getStaticProps
  // bind: [
  //   userDetailsFromAuthProvider,
  //   profilesTable,
  //   venuesTable,
  //   chatsTable,
  //   messagesTable,
  // ],
});
