// models/Product.js
import { Model } from "@nozbe/watermelondb";
import { field, relation, children } from "@nozbe/watermelondb/decorators";

export default class Product extends Model {
  static table = "products";

  @field("name") name!: string;
  @field("price") price!: number;
  @field("available") available!: boolean;
  @field("environment_score") environmentScore!: string;
  @field("category") category!: string;
  @field("latitude") latitude!: number;
  @field("longitude") longitude!: number;

  @relation("businesses", "business_id") business!: string;
  @children("product_keywords") keywords!: string[];
}
