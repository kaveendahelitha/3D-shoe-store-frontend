const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();//allow to call environment variables right inside node application 


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use("/auth", require("./routes/auth"));//new added

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));