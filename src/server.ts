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

app.use(function(err, req, res, next) {
  // Define o status HTTP do erro (padrão é 500)
  res.status(err.status || 500);

  // Retorna uma resposta JSON com a mensagem de erro
  res.send(
    { 
      mensagem: err.message
    
    });
});

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO NA PORTA: ${PORT}`);
})
 