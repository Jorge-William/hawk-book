import cors from  'cors'
import rotas from './routes/index'
import bodyParser from 'body-parser'

import express from 'express'

const app = express()

const corsOptions = {
    origin: "http://localhost:5001/",
  };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(rotas)
app.use(express.static("build"))
app.use(cors(corsOptions));
const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO NA PORTA: ${PORT}`);
})
 