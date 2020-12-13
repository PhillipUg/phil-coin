import sha256 from 'crypto-js/sha256'

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
  }
}


class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "12/12/2020", "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }
}


let phil_coin = new Blockchain()
phil_coin.addBlock(new Block(1, "13/12/2020", { amount: 4 }))
phil_coin.addBlock(new Block(2, "14/12/2020", { amount: 20 }))

console.log(JSON.stringify(phil_coin, null, 4));