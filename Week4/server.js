const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/submit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsed = querystring.parse(body);
      console.log("Received data:", parsed);

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      res.end(`
          <h1>Data received successfully</h1>
          <p>Name: ${parsed.name}</p>
          <p>Age: ${parsed.age}</p>
      `);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found. Please submit the form via POST to /submit");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
