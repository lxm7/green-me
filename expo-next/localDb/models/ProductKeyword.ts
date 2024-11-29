// models/ProductKeyword.js
import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class ProductKeyword extends Model {
  static table = "product_keywords";

  @field("keyword") keyword!: string;
  @relation("products", "product_id") product!: string;
}
