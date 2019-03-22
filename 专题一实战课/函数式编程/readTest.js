const fs = require('fs');

class Fn {
  constructor (x) {
    this.value = x;
  }
  map (f) {
    return Fn.of(f(this.value));
  }
}

Fn.of = (x) => new Fn(x);

class IO extends Fn{
  join () {
    return this.value;
  }

  flatMap (f) {
    return this.map(f).join()
  }
  map (f) {
    return IO.of(f(this.value));
  }
}

const readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8');
  });
}

IO.of = (x) => new IO(x);

const print = function (x) {
  return new IO(function () {
    console.log('11111111');
    return x;
  });
}

const result = readFile('./test.js').flatMap(print);
console.log(result.value()())
// console.log(IO.of('./test.js').flatMap(readFile));
// IO.of('./test.js').map(readFile).flatMap(print);
// console.log(IO)

