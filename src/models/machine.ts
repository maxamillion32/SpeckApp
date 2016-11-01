
export class Machine {
    id: number;
    name: string;
    countBeacons: number;
    
    constructor(id: number, name: string, countBeacons: number) {        
        this.id = id;
        this.name = name;
        this.countBeacons = countBeacons;
    }
}