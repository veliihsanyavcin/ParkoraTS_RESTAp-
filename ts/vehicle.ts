import { VehicleType } from "./vehicletype";

export class Vehicle {
  private _plate: string;
  private _type: VehicleType;

  constructor(plate: string, type: VehicleType) {
    this._plate = plate;
    this._type = type;
  }

  public get plate() {
    return this._plate;
  }

  public get type() {
    return this._type;
  }

  public checkPlate() {
    var plate = this._plate.replace(/\s+/g, "").toUpperCase();
    var regex = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))$/;
    if (plate.match(regex) == null) {
      throw new Error("PLAKAYI HATALI GİRDİNİZ.LÜTFEN TEKRAR DENEYİNİZ");
    }
  
  }
}