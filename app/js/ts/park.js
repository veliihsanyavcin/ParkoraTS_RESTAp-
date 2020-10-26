import { Recipe } from "./recipe";
import { Slot } from "./slot";
import { VehicleType } from "./vehicletype";
export class Park {
    constructor() {
        this._trackSlot = new Slot(5, [new Recipe(5, 0), new Recipe(1500, 15)]);
        this._busSlot = new Slot(5, [new Recipe(2, 0), new Recipe(1500, 25)]);
        this._carSlot = new Slot(5, [new Recipe(2, 0), new Recipe(1500, 20)]);
        this._motorbikeSlot = new Slot(5, [new Recipe(3, 0), new Recipe(1500, 15)]);
    }
    // Parka giriş için kullnılan metod
    parkIn(vehicle) {
        try {
            vehicle.checkPlate();
        }
        catch (error) {
            alert(error);
            return;
        }
        switch (vehicle.type) {
            case VehicleType.Truck: {
                this._trackSlot.slotIn(vehicle);
                break;
            }
            case VehicleType.Bus: {
                this._busSlot.slotIn(vehicle);
                break;
            }
            case VehicleType.Car: {
                this._carSlot.slotIn(vehicle);
                break;
            }
            case VehicleType.Motorbike: {
                this._motorbikeSlot.slotIn(vehicle);
                break;
            }
        }
    }
    // Parktan çıkış için kullnılan metod
    parkOut(vehicle) {
        switch (vehicle.type) {
            case VehicleType.Truck: {
                this._trackSlot.slotOut(vehicle.plate);
                break;
            }
            case VehicleType.Bus: {
                this._busSlot.slotOut(vehicle.plate);
                break;
            }
            case VehicleType.Car: {
                this._carSlot.slotOut(vehicle.plate);
                break;
            }
            case VehicleType.Motorbike: {
                this._motorbikeSlot.slotOut(vehicle.plate);
                break;
            }
        }
    }
    getParkIn() {
        var ticketList = [];
        ticketList.push(...this._trackSlot.getSlotIn());
        ticketList.push(...this._busSlot.getSlotIn());
        ticketList.push(...this._carSlot.getSlotIn());
        ticketList.push(...this._motorbikeSlot.getSlotIn());
        return ticketList;
    }
    getParkOut() {
        //debugger
        var ticketList = [];
        ticketList.push(...this._trackSlot.getSlotOut());
        ticketList.push(...this._busSlot.getSlotOut());
        ticketList.push(...this._carSlot.getSlotOut());
        ticketList.push(...this._motorbikeSlot.getSlotOut());
        return ticketList;
    }
}
