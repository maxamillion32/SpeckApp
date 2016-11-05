
export class Machine {
    id: number;
    name: string;
    type: string;
    description: string;
    countBeacons: number;
    assignedBeacons: any;
    rssi: any;

    constructor(id: number, name: string, type: string, description: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.assignedBeacons = [];
    }
}