import { SHA256 } from 'crypto-js';
import Transaction from './transaction';

export default class Block {
	public hash: string;
	private nonce: number;

	constructor(
		private timestamp: Date,
		public transactions: Transaction[],
		public previousHash: string = ''
	) {
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash = (): string => {
		return SHA256(
					this.timestamp +
					this.previousHash +
					JSON.stringify(this.transactions) +
					this.nonce
				).toString();
	}

	mineBlock = (difficulty: number): void => {
		while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
			console.log(this.nonce);
			this.nonce++;
			this.hash = this.calculateHash();
			console.log(this.hash);
		}

		console.log('Block mined. Hash: ' + this.hash);
	}

	verifyAllTransactions = (): boolean => {
		for (const transaction of this.transactions) {
			if (!transaction.isValid()) {
				return false;
			}
		}

		return true;
	}
}
