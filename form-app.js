const http = require('http');
const fs = require('fs');
const url = require('url');

var server = http.createServer((req, res) => {
  if (req.url == '/') {
    fs.readFile('form.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(data);
      res.end();
    });
  } else if (req.url == '/listar') {
    fs.readFile('cadastro.txt', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(data);
      res.end();
    });
  } else {
    const q = url.parse(req.url, true);
    const nome = q.query.nome;
    const email = q.query.email;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    const resposta =
      `<html>
      <head>
      <title> Resposta Formulário </title>
      </head>
      <body>
        <h1>Olá ${nome} </h1>
        <h2> Confirme seus dados:</h2>
        <p> Seu nome: ${nome} </p>
        <p> Seu email: ${email} </p>
      </body>
    </html>`
    res.write(resposta);
    res.end();

    fs.appendFile('cadastro.txt', `Nome: ${nome} Email: ${email}` + '\n', (err) => {
      if (err) throw err;
      console.log('Salvo com Sucesso!');
    });
  }
});

server.listen(3000);
console.log('Servidor rodando na porta 3000');