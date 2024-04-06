const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const indexRouter = require('./routes/index');
const app = express();

const templatePath = path.join(__dirname, './views');
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", templatePath); 
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

// Route for handling index
app.use("/", indexRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

module.exports = app;
