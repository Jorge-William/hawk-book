import cors from  'cors'
import rotas from './routes/index'
import bodyParser from 'body-parser'

import express from 'express'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:3000/",
};
  
app.use(rotas)

app.use(cors(corsOptions));
app.use(express.static("build"))
const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO NA PORTA: ${PORT}`);
})
 