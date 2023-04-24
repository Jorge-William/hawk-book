import { prisma } from "../lib/prisma";
import { uuid as uuidv4 } from 'uuid'
import express from 'express'
import multer from 'multer'
// import path from 'path'
import fs from 'fs/promises'
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

// router.use("/imagens", express.static("/"));

router.post("/inserir-candidato", criaPasta, upload.array('files'),
  async (req, res) => {
    const caminho = 'teste'

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
      bairro,
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
            cep,
            img_frente: caminho,
            img_perfil: caminho,
            curso: {
              connect: arrayDeCursos.map((curso) => { return { id: curso } }),
            },
          },
          include: {
            curso: true, // Include all posts in the returned object
          },
        });

        res.send({ "status": true, msg: "Candidato salvo!!!", criarCandidato });


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
            cep,
            img_frente: caminho,
            img_perfil: caminho,
          }

        })

        res.send({ status: true, msg: "Candidato salvo com sucesso!!! Sem cursos", criarCandidato })

      } catch (error) {
        console.log(error);
        res.send({ status: false, error })
      }
    }

  });

// ---------------------------- Insere um Curso ---------------------------------

router.post("/inserir-curso", async (request, response, next) => {
  console.log(request.body);

  // const cursoData = z.object({
  //   nome_curso: z.string(),
  //   descricao_curso: z.string(),
  // });

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

