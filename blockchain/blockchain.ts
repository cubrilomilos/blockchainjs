import Block from './block';

export default class Blockchain {
    blockchain: Block[];
    difficulty = 1;

    constructor(difficulty: number) {
        this.blockchain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }

    createGenesisBlock = (): Block => {
        return new Block(0, new Date(), {}, '0');
    }

    getLastBlock = (): Block => {
        return this.blockchain[this.blockchain.length - 1];
    }

    addBlock = (newBlock: Block): void => {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.blockchain.push(newBlock);
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
}
