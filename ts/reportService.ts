import { Ticket } from "./ticket";
import { Vehicle } from "./vehicle";
import { VehicleType } from "./vehicletype";

export class ReportService {
   

    parkOut(vehicle: Vehicle) : Promise<void> {
      
        const body = {plate:vehicle.plate, type:vehicle.type};
        return fetch('https://localhost:44333/report', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(r => r.json());  
    
    }

   
    getParkOut() : Promise<Ticket[]>{
        
        return fetch('https://localhost:44333/report', {
            method: 'GET',
            //body: JSON.stringify(ticket),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(r => r.json());  
    }

    // getParkOutList():Promise<Ticket[]>{
        
    //     return fetch('https://localhost:44333/ticket', {
    //         method: 'GET',
           
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //     .then(r => r.json());  
    // }

}