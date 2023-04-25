import { prisma } from "../lib/prisma";
// import { uuid as uuidv4 } from 'uuid'
import express from 'express'
import multer from 'multer'
// import path from 'path'
import fs from 'fs/promises'
import path from 'path'
import storage from "../config/multer.config"
import ControllerCandidato from "../controllers/Candidatos.controller";

const router = express.Router()

const upload = multer({ storage });

const criaPasta = async (req, res, next) => {
  const statusPasta = await fs.mkdir(
    `./imagens/${req.query.nome}/`,
    { recursive: true },
  );
  // console.log(statusPasta);

  next()
}



router.post("/inserir-candidato", criaPasta, upload.array('files'), async (req, res) => {

  const caminhoImgFrente = req.files[0].path;
  const caminhoImgPerfil = req.files[1].path;

  // arquivo com terminação - nome_do_arquivo.pdf
  const arquivoFrente = path.basename(caminhoImgFrente);
  const arquivoPerfil = path.basename(caminhoImgPerfil);
  // console.log(arquivo);

  // caminho do arquivo
  // console.log(path.dirname(caminho));

  // nome do arquivo - L8889L071
  const nomeFrente = path.basename(caminhoImgFrente, path.extname(caminhoImgFrente));
  const nomePerfil = path.basename(caminhoImgPerfil, path.extname(caminhoImgPerfil));
  // console.log(nomeDoArquivo);

  // caminho do arquivo - /pastas/lei/L8889/L8889L071.pdf
  const caminhoDoArquivoFrente = path.join(
    `/imagens/${req.body.nome}/${arquivoFrente}`,
  );
  const caminhoDoArquivoPerfil = path.join(
    `/imagens/${req.body.nome}/${arquivoPerfil}`,
  );

  // console.log(caminhoDoArquivo);


  const {
    nome,
    cpf_num,
    data_nascimento,
    nome_da_mae,
    nome_do_pai,
    cnh_categoria,
    cnv_status,
    telefone,
    peso,
    altura,
    endereco,
    cidade,
    bairro,
    tipo,
    cep,
  } = req.body;

  if (req.body.cursos) {

    const arrayDeCursos = req.body.cursos.split(",");

    try {

      const criarCandidato = await prisma.candidato.create({
        data: {
          nome,
          cpf_num,
          data_nascimento,
          nome_da_mae,
          nome_do_pai,
          cnh_categoria,
          cnv_status,
          telefone,
          peso,
          altura,
          endereco,
          bairro,
          cidade,
          cep,
          tipo,
          img_frente: arquivoFrente,
          img_perfil: arquivoPerfil,
          curso: {
            connect: arrayDeCursos.map((curso) => { return { id: curso } }),
          },
        },
        include: {
          curso: true, // Include all posts in the returned object
        },
      });

      if (criarCandidato) {
        res.send({ "status": true, msg: "Candidato salvo!!!", criarCandidato });
      }


    } catch (error) {
      console.log(error);
      res.send({ status: false, error })
    }

  } else {

    try {

      const criarCandidato = await prisma.candidato.create({
        data: {
          nome,
          cpf_num,
          data_nascimento,
          nome_da_mae,
          nome_do_pai,
          cnh_categoria,
          cnv_status,
          telefone,
          peso,
          altura,
          endereco,
          bairro,
          cidade,
          cep,
          tipo,
          img_frente: arquivoFrente,
          img_perfil: arquivoPerfil,
        }

      })
      if (criarCandidato) {
        res.send({ status: true, msg: "Candidato salvo com sucesso!!! Sem cursos", criarCandidato })
      }

    } catch (error) {
      console.log(error);
      res.send({ status: false, error })
    }
  }

});

// ---------------------------- Insere um Curso ---------------------------------

router.post("/inserir-curso", async (request, response, next) => {
  console.log(request.body);



  const { nome_curso, descricao_curso } = request.body;

  try {
    const registroJaExiste = await prisma.curso.findFirst({
      where: {
        nome_curso: {
          equals: nome_curso,
        },
      },
    });

    console.log(registroJaExiste);
    if (registroJaExiste) {
      // response.send({ status: false, "msg": "Registro já existe no sistema" });
      const error = new Error('Usuário já existe!')

      return next(error)
    }
    const criarCurso = await prisma.curso.create({
      data: {
        nome_curso,
        descricao_curso,
      },
    });
    response.status(200).send({ status: true, "msg": "Registro salvo.", criarCurso });
  } catch (error) {
    console.error(error);
    response.send({ status: false, error, msg: 'Curso já existe no sistema.' });
  }
});
// ------------------------- Retorna todos os candidatos --------------------------------

router.get("/candidatos", ControllerCandidato.index);


router.get("/todos-cursos", async (request, response) => {

  const todosCursos = await prisma.curso.findMany()

  response.status(200).send({ result: todosCursos })
})


export default router

