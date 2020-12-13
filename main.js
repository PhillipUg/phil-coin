import sha256 from 'crypto-js/sha256.js'

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.nonce = 0;
  }

  calculateHash() {
    return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash()
    }
    console.log('Block mined: ', this.hash)
  }
}


class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  createGenesisBlock() {
    return new Block(0, "12/12/2020", "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock)
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      let currentBlock = this.chain[i]
      let previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) return false
      if (currentBlock.previousHash !== previousBlock.hash) return false

    }
    return true
  }
}


let phil_coin = new Blockchain()
console.log("Mining block 1...")
phil_coin.addBlock(new Block(1, "13/12/2020", { amount: 4 }))
console.log("Mining block 2...")
phil_coin.addBlock(new Block(2, "14/12/2020", { amount: 20 }))

