import {Readable,Writable,Transform} from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++;
    setTimeout(() => {    
        if (i > 100) {
        this.push(null);
        } else {
        this.push(`${i}\n`);
        }
    }, 1000);
  }

}
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        const number = parseInt(chunk.toString(), 10);
        const result = number * 10;
        console.log(result);
        callback();
    }
  }
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString(), 10);
        const result = number * -1;
        
        callback(null,`${result}\n`);
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream());