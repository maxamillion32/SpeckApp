
export class Beacon {
    id: string;
    name: string;
    rssi: number;
    
    constructor(id: string, name: string, rssi: number) {
        this.id = id;
        this.name = name;
        this.rssi = rssi;

        console.log('Instantiated beacon with the following values:');
        console.log(JSON.stringify(this)); 
    }
}