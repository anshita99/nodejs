const os = require('os');

console.log(os.arch());
console.log(os.hostname());
console.log(os.platform());
console.log(os.tmpdir());

const freeMemory = os.freemem();
// console.log(freeMemory)

console.log(`${freeMemory/1024/1024}`)

const totalMemory = os.totalmem();
// console.log(freeMemory)

console.log(`${totalMemory/1024/1024/1024}`)