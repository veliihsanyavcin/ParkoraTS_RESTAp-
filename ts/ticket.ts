import { Vehicle } from "./vehicle";

export class Ticket {
  private _vehicle: Vehicle;
  private _timeIn: Date; //Giriş zamanı için kullanılır.
  private _timeOut: Date; //Çıkış zamanı için kullanılır.
  private _cost: number = 0;

  constructor(vehicle: Vehicle, timeIn: Date) {
    this._vehicle = vehicle;
    this._timeIn = timeIn;
  }

  public get vehicle() {
    return this._vehicle;
  }

  public get timeIn() {
    return this._timeIn;
  }

  public get timeOut() {
    return this._timeOut;
  }

  public set timeOut(value: Date) {
    this._timeOut = value;
  }

  public get cost() {
    return this._cost;
  }

  public set cost(value: number) {
    this._cost = value;
  }
}