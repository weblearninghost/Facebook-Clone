const express = require('express');
const cors = require('cors');
// const corsOptions = {
//   origin: 'http://localhost:8000', //frontend URL
// };
const app = express();
app.use(cors()); // cors options can be passed over here

app.get('/', (req, res) => {
  res.send('Welcome from HOME!');
});

app.get('/books', (req, res) => {
  res.send('Welcome from BOOKSsss!');
});

app.listen(8000, () => {
  console.log('Sever is running on port 8000!');
});
