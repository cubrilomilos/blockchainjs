export default class Transaction {
	constructor(public amount: number, public addressFrom: string | null, public addressTo: string) {}
}
