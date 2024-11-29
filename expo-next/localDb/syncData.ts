// import { synchronize } from "@nozbe/watermelondb/sync";

import { supabase } from "@utils/supabase";
import { database } from "./";

// export async function mySync() {
//   await synchronize({
//     database,
//     pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
//       // const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
//       //   JSON.stringify(migration),
//       // )}`;
//       // const response = await fetch(`https://my.backend/sync?${urlParams}`);
//       // if (!response.ok) {
//       //   throw new Error(await response.text());
//       // }

//       const { data: businesses } = await supabase
//         .from("businesses")
//         .select("*");
//       const { data: products } = await supabase.from("products").select("*");
//       const { data: productKeywords } = await supabase
//         .from("product_keywords")
//         .select("*");
//       const { changes, timestamp } = {
//         changes: {
//           businesses, // : { created: [], updated: [], deleted: [] },
//           products, // : { created: [], updated: [], deleted: [] },
//           product_keywords: productKeywords, // : { created: [], updated: [], deleted: [] },
//         },
//         timestamp: Date.now(),
//       };
//       return { changes, timestamp };
//     },
//     pushChanges: async ({ changes, lastPulledAt }) => {
//       const response = await fetch(
//         `https://my.backend/sync?last_pulled_at=${lastPulledAt}`,
//         {
//           method: "POST",
//           body: JSON.stringify(changes),
//         },
//       );
//       if (!response.ok) {
//         throw new Error(await response.text());
//       }
//     },
//     migrationsEnabledAtVersion: 1,
//   });
// }

export async function syncData() {
  // Fetch data from Supabase
  const { data: businesses } = await supabase.from("businesses").select("*");
  const { data: products } = await supabase.from("products").select("*");
  const { data: productKeywords } = await supabase
    .from("product_keywords")
    .select("*");

  // Batch operations in WatermelonDB
  await database.write(async () => {
    const businessCollection = database.collections.get("businesses");
    const productCollection = database.collections.get("products");
    const keywordCollection = database.collections.get("product_keywords");

    // Upsert businesses
    await businessCollection.createOrUpdate(businesses);
    // businesses &&
    //   (await businessCollection.batch(
    //     businesses.map((business) =>
    //       businessCollection.prepareCreate((record) => {
    //         Object.assign(record, business);
    //       }),
    //     ),
    //   ));
    // Upsert products
    await productCollection.createOrUpdate(products);

    // Upsert product keywords
    await keywordCollection.createOrUpdate(productKeywords);
  });
}
