const http = require("http");
const { URL } = require("url");
const bodyParser = require("./helpers/bodyParder");
const routes = require("./routes");

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`http://localhost:3000${req.url}`);

  let { pathname, searchParams } = parsedUrl;
  let id = null;

  console.log(`Request method: ${req.method} | Endpoint: ${pathname}`);

  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find(
    (route) => pathname === route.endpoint && req.method === route.method
  );

  if (route) {
    req.query = Object.fromEntries(searchParams);
    req.params = { id };
    res.send = (statusCode, body) => {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(JSON.stringify(body));
    };
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      bodyParser(req, () => route.handler(req, res));
    } else {
      route.handler(req, res);
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`Cannot ${req.method} ${pathname}`);
  }
});

server.listen(3000, () =>
  console.log("🔥 server listen at http://localhost:3000")
);
