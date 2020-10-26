export class Recipe {
    private _period: number; // Çıkış yapan araçların otopark ücretlendirmesi yapılırken kullanılan veri tipi.
    private _cost: number = 0; // Otoprakımızdan çıkış yapan araçların ödedeği ücretlerin toplamın hesaplanması için kullandığımız veri tipi.
  
    constructor(period: number, cost: number) {
      this._cost = cost;
      this._period = period;
    }
  
    public get period() {
      return this._period;
    }
  
    public set period(value: number) {
      this._period = value;
    }
    public get cost() {
      return this._cost;
    }
  
    public set cost(value: number) {
      this._cost = value;
    }
  
  }