import { SHA256 } from 'crypto-js';
import { ec } from 'elliptic';
const ecAlgorythm = new ec('secp256k1');

export default class Transaction {
	signature: any;
	constructor(public amount: number, public addressFrom: string | null, public addressTo: string) {}

	calculateHash = (): string => {
		return SHA256(this.addressFrom + this.addressTo + this.amount).toString();
	}

	signTransaction = (signingKey: ec.KeyPair): void => {
		if (signingKey.getPublic('hex') !== this.addressFrom) {
			throw new Error('You cannot sign transaction for wallets that don\'t belong to you');
		}

		const transactionHash = this.calculateHash();
		const signature = signingKey.sign(transactionHash, 'base64');
		this.signature = signature.toDER('hex');
	}

	isValid = (): boolean => {
		if (this.addressFrom === null) {
			return true;
		}

		if (!this.signature || this.signature.length === 0) {
			throw new Error('Transaction is not signed');
		}

		const publicKey = ecAlgorythm.keyFromPublic(this.addressFrom, 'hex');
		return publicKey.verify(this.calculateHash(), this.signature);
	}
}
