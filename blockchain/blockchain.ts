import Block from './block';
import Transaction from './transaction';

export default class Blockchain {
	private blockchain: Block[];
	private difficulty = 1;
	// Blocks are created (mined) only in specified intervals. For example Bitcoin's POW algorithm allows block creation
	// every 10min, while Etherium's allows every 13 seconds
	public pendingTransactions: Transaction[] = [];
	private miningReward = 1;

	constructor(difficulty: number) {
		this.blockchain = [this.createGenesisBlock()];
		this.difficulty = difficulty;
	}

	createGenesisBlock = (): Block => {
		return new Block(new Date(), [], '0');
	}

	getLastBlock = (): Block => {
		return this.blockchain[this.blockchain.length - 1];
	}

	validateChain = (): boolean => {
		for (let i = 1; i < this.blockchain.length; i++) {
			const currentBlock = this.blockchain[i];
			const prevBlock = this.blockchain[i - 1];

			if (currentBlock.previousHash !== prevBlock.hash) {
				return false;
			}

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
		}

		return true;
	}

	minePendingTransactions = (rewardAddress: string): void => {
		const block = new Block(new Date(), this.pendingTransactions);
		block.mineBlock(this.difficulty);

		console.log('Block mined. Hash: ' + block.hash);

		this.blockchain.push(block);

		this.pendingTransactions = [
			new Transaction(this.miningReward, null, rewardAddress)
		];
	}

	createTransaction = (transaction: Transaction): void => {
		// in realworld not all the pending transactions would be pushed to every block
		this.pendingTransactions.push(transaction);
	}

	getWalletBalance = (walletAddress: string): number => {
		let balance = 0;

		for (const block of this.blockchain) {
			for (const transaction of block.transactions) {
				if (transaction.addressFrom === walletAddress) {
					balance -= transaction.amount;
				}

				if (transaction.addressTo === walletAddress) {
					balance += transaction.amount;
				}
			}
		}

		return balance;
	}
}
