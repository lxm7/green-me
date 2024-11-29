import { Model } from "@nozbe/watermelondb";
import { field, children } from "@nozbe/watermelondb/decorators";

import { Product } from "@components/MapContainer/types";

export default class Business extends Model {
  static table = "businesses";
  // static associations = {
  //   comments: { type: 'has_many', foreignKey: 'post_id' },
  // }

  @field("name") name!: string;
  @field("business_type") businessType!: string;
  @field("score") score!: number;
  @field("latitude") latitude!: number;
  @field("longitude") longitude!: number;
  @field("green_score") greenScore!: number;
  @field("co2e") co2e!: number;
  @field("image") image!: string;

  @children("products") products!: Product[];
}
