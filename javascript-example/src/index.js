const app = require('./app');
const port = 3000;

app.express.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});