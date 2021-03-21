import { SHA256 } from 'crypto-js';

export default class Block {
    hash: string;
    nonce: number;

    constructor(
        public index: number, 
        public timestamp: Date, 
        public payload: any, 
        public previousHash: string = '', 
    ) {
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash = (): string => {
        return SHA256(this.index.toString() + 
                    this.timestamp + 
                    this.previousHash + 
                    JSON.stringify(this.payload) + 
                    this.nonce
                ).toString();
    }

    mineBlock = (difficulty: number): void => {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined. Hash: ' + this.hash);
    }
}