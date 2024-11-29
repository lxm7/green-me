import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "businesses",
      columns: [
        { name: "name", type: "string", isIndexed: true },
        { name: "business_type", type: "string", isOptional: true },
        { name: "score", type: "number", isOptional: true },
        { name: "latitude", type: "number", isOptional: true, isIndexed: true },
        {
          name: "longitude",
          type: "number",
          isOptional: true,
          isIndexed: true,
        },
        { name: "green_score", type: "number", isOptional: true },
        { name: "co2e", type: "number", isOptional: true },
        { name: "image", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: "products",
      columns: [
        { name: "name", type: "string", isIndexed: true },
        { name: "price", type: "number" },
        { name: "available", type: "boolean" },
        { name: "business_id", type: "string", isIndexed: true },
        { name: "environment_score", type: "number", isOptional: true },
        { name: "category", type: "string", isOptional: true, isIndexed: true },
        { name: "latitude", type: "number", isOptional: true, isIndexed: true },
        {
          name: "longitude",
          type: "number",
          isOptional: true,
          isIndexed: true,
        },
      ],
    }),
    tableSchema({
      name: "product_keywords",
      columns: [
        { name: "product_id", type: "string", isIndexed: true },
        { name: "keyword", type: "string", isIndexed: true },
      ],
    }),
  ],
});
