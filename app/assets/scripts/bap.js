

const server = http.createServer((req, res) => {
  console.log('clear on the wall');
  if (req.method === 'POST') {
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', () => {
      console.log(body);
      res.end('ok');
  });
}
});
