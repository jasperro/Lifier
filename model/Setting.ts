import { date, field, readonly } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

class Setting extends Model {
  static table = "settings";
  @field("setting_id") settingID;
  @field("boolean_value") boolValue;
  @field("number_value") numValue;
  @date("string_value") strValue;
  //@readonly @field("id") ID;
}

export default Setting;
