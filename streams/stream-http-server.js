import http from 'node:http';
import {Transform} from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString(), 10);
        const result = number * -1;
        console.log(result)
        callback(null,Buffer.from(String(result)));
    }
}


const server = http.createServer(async (req, res) => {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const fullStreamContent = Buffer.concat(buffers).toString();
    console.log(fullStreamContent);
    return res.end(fullStreamContent);

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res);
})
server.listen(3334);