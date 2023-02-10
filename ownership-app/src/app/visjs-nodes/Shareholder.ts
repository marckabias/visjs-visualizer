export class Shareholder {
    childShareholder!: string;
    data!: any;
    parentList!: [];

    constructor(data: any) {
        this.childShareholder = data.childShareholder;
        this.data = data;
    }
}
