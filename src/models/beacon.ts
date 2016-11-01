
export class Beacon {
    id: number;
    name: string;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;

        console.log('Instantiated beacon with id ' + this.id + ' and name ' + this.name);
    }
}