#node-qr-webservice
A node.js based QR encoding and decoding webservice.


##Installation
```bash
$ npm install
```


##Dependencies
  * express
  * body-parser
  * qr-image
  * request
  * strftime
  * zbarimg - You need the binary somewhere globally


##Usage
1. Start the server by typing `node app`
2. Point your browser to `http://127.0.0.1:3000/`


###Encoding / creating QR-Codes
The url scheme for creating a code looks like `http://127.0.0.1:3000/encode/:format/:data` where `:data` is just a simple string and format can be one of the following:
  * PNG
  * SVG
  * PDF
  * EPS

Additionaly you can add some level of error correction by adding the `:ecl` parameter right after the format like `http://127.0.0.1:3000/encode/:format/:ecl/:data` where `:ecl` can be `L`,`M`,`Q` or `H`. If none is given it defaults to `M`.

Example `http://127.0.0.1:3000/encode/PNG/This%20is%20awesome`

###Decoding / reading QR-Codes
Currently codes can be only read from external URLs e.g. `http://127.0.0.1:3000/decode/?http://www.example.com/qrcode.png`
