import { VehicleType } from "./vehicletype";

export class TypeService {
   
    getTypes() : Promise<string[]> {
        
        return fetch('https://localhost:44333/types', {
            method: 'GET',
           // body: "",
            headers: {
                'content-type': 'application/json'
            }
        }).then(r => r.json());
       
    }
 
   

}