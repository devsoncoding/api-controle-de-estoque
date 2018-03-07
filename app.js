const http = require('http');
const _url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const getQuery = function (query, key) {
    // if (query !== null && query !== 0 && query !== '' && query !== undefined) {
    if (query) {
        // file=test.txt&content=this is a simple test content
        const valuePairs = query.split('&');
        for (var i = 0; i < valuePairs.length; i++) {
            // file=teste.txt
            const vp = valuePairs[i].split('=');
            if (vp.length >= 1 && vp[0] === key) {
                return vp[1];
            }
        }
    }

    return null;
}

const saveFile = function (filename, content) {
    fs.writeFile('./' + filename, content, function (error) {
        if (error) {
            console.log('error file', error);
        } else {
            console.log('success!');
        }
    });
};

const server = http.createServer(function (request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');

    var url = _url.parse(request.url);
    const file = getQuery(url.query, 'file');
    const content = getQuery(url.query, 'content');
    const result = 'O arquivo ' + file + ' terá o conteúdo seguinte: ' + content;

    if (file && content) {
        saveFile(file, content);
    }
    
    console.log(result);
    response.end(result + '\n');
});

server.listen(port, hostname, function () {
    console.log('Começou a escutar...');
});
