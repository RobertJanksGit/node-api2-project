// require your server and launch it here
const server = require("./api/server");

const port = 5000;

server.get("/", (req, res) => {
  res.send("Hello from express!");
});

server.listen(port, () => {
  console.log(`API running on port ${port}`);
});
