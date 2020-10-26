import { Recipe } from "./recipe";
import { Slot } from "./slot";
import { Ticket } from "./ticket";
import { Vehicle } from "./vehicle";
import { VehicleType } from "./vehicletype";
import { TicketService } from "./ticketService";
import { ReportService } from "./reportService";


export class Park {

  private ticketService : TicketService  = new TicketService();
  private reportService : ReportService  = new ReportService();

  
  constructor() {
    
  }

  // Parka giriş için kullnılan metod
  public parkIn(vehicle: Vehicle) : Promise<void> {
  
    return this.ticketService.parkIn(vehicle);
    
  }

  // Parktan çıkış için kullnılan metod
  public parkOut(vehicle: Vehicle): Promise<void>{
     return this.reportService.parkOut(vehicle);
  }

 public getParkIn(): Promise<Ticket[]>{
    
  return this.ticketService.getParkIn();

  
  }

  public getParkOut(): Promise<Ticket[]>{
    return this.reportService.getParkOut();
   
  }
}
