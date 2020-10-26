import { VehicleType } from "./vehicletype";
import { Ticket } from "./ticket";
import { Recipe } from "./recipe";
import { Vehicle } from "./vehicle";

export class Slot {
  private _capacity: number;
  private _recipeList: Recipe[]; //Araçların ücret tarifesi listesi.
  private _ticketList: Ticket[] = []; //Giriş-Çıkış yapan araçların listesi.

  constructor(capacity: number, recipeList: Recipe[]) {
    this._capacity = capacity;
    this._recipeList = recipeList;
  }

  public slotIn(vehicle: Vehicle) {
    let isExist: boolean;
    if (!this.isEmpty()) {
      alert("Otopark dolu");
      isExist = true;
    }
    if (this.isAlreadyIn(vehicle.plate)) {
      alert("araç içerde");
      isExist = true;
    }
    if(!isExist) {
      var NewTicket = new Ticket(vehicle, new Date());
      this._ticketList.push(NewTicket);
    }
  }

  public slotOut(plate: string) {
    let index = this._ticketList.findIndex(x => x.vehicle.plate === plate);
    this._ticketList[index].timeOut = new Date();
    let cost: number = this.calcPayment(this._ticketList[index]);
    this._ticketList[index].cost = cost;

  }

  public getSlotIn(): Ticket[] {
    return this._ticketList.filter(x => !x.timeOut);
  }

  public getSlotOut(): Ticket[] {

    return this._ticketList.filter(x => !!x.timeOut);
  }

  private isEmpty(): boolean {

    return this._capacity - this.getSlotIn().length > 0;
  }

  private isAlreadyIn(plate: string): boolean {

    return this.getSlotIn().some(ticket => ticket.vehicle.plate === plate);

  }

  private calcPayment(ticket: Ticket): number {

    let fark = ticket.timeOut.getSeconds() - ticket.timeIn.getSeconds();
    let saniye = fark;
    this._recipeList.sort((x, y) => x.period - y.period);
    var maxPeriod = this._recipeList[this._recipeList.length - 1].period;

    let totalCost: number = 0;
    let remaininSecond: number = saniye;
    let currentPeriodCost: number = 0;
    let previousRecipe: Recipe = null;

    for (let i = 0; i < Math.ceil(saniye / maxPeriod); i++) {
      currentPeriodCost = 0;

      this._recipeList.forEach(recipe => {
        if (previousRecipe != null && previousRecipe.period < remaininSecond &&
          remaininSecond <= recipe.period) {
          currentPeriodCost = recipe.cost;
        }
        else if (remaininSecond >= recipe.period) {
          currentPeriodCost = recipe.cost;
        }

        previousRecipe = recipe;
      });

      totalCost += currentPeriodCost;
      remaininSecond -= maxPeriod;
    }
    return totalCost;
  }
}