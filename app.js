const express = require('express');

const app = express();
const PORT = 3000;

// Set the views folder and the view engine
app.set('views', './views');
app.set('view engine', 'ejs');


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Server listener
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
