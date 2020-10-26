import { Ticket } from "./ticket";
import { Vehicle } from "./vehicle";
import { VehicleType } from "./vehicletype";

export class TicketService {
   

    parkIn(vehicle: Vehicle) : Promise<void> {
      
        const body = {plate:vehicle.plate, type:vehicle.type};
        return fetch('https://localhost:44333/ticket', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        }).then(); 

    }

   
    getParkIn() : Promise<Ticket[]>  {
        
        return fetch('https://localhost:44333/ticket', {
            method: 'GET',
           // body: "",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(r => r.json());  
    }

   

}