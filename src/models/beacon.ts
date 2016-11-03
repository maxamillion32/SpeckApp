
export class Beacon {
    id: string;
    name: string;
    rssi: number;
    color: string;

    constructor(id: string, name: string, rssi: number) {
        this.id = id;
        this.name = name == null ? '<Noname beacon>' : name;
        this.rssi = rssi;

        console.log('Instantiated beacon with the following values:');
        console.log(JSON.stringify(this));
    }

    getColor() {
        if (this.rssi > -65){
            return "secondary";
        }
        if(this.rssi > -100){
            return "dark";
        }
        return "danger";
    }
}