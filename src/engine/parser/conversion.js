import { cloneDeep } from "lodash";
import conversion from "../constants/conversion";

class Conversion {
  constructor() {
    this.data = conversion;
  }

  getValue() {
    return this.data;
  }

  clone() {
    const dupData = cloneDeep(this.data);
    const dupConversion = new Conversion();
    dupConversion.data = dupData;
    return dupConversion;
  }
}
export default Conversion;
