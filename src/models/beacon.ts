
export class Beacon {
    id: string;
    name: string;
    rssi: number;
    color: string;
    frameType: string;
    rangingData: string;
    nid: string;
    bid: string;
    rfu: string;
    lastUpdated: Date;
    isReachable: boolean;
    uniqueId: string;

    constructor(id: string, name: string, rssi: number, frameType: string, rangingData: string, nid: string, bid: string, rfu: string) {
        this.id = id;
        this.name = name == null ? '<Noname beacon>' : name;
        this.rssi = rssi;
        this.frameType = frameType;
        this.rangingData = rangingData;
        this.nid = nid;
        this.bid = bid;
        this.rfu = rfu;
        this.uniqueId = nid + ' - ' + bid;
        this.isReachable = true;
        this.lastUpdated = new Date();

        // console.log('Instantiated beacon with the following values:');
        // console.log(JSON.stringify(this));
    }

    getColor() {
        if (this.rssi > -65) {
            return "secondary";
        }
        if (this.rssi > -100) {
            return "orange";
        }
        return "danger";
    }
}