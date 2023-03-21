require('dotenv').config()
const express = require('express')
const multer = require('./multer')
const { uploadFile, listagemArquivos, excluirArquivo } = require('./storage')

const app = express()

app.use(express.json())

//upload de 1 arquivo
app.post('/upload', multer.single('arquivo'), async (req, res) => {
  const { file } = req

  try {
    const arquivo = await uploadFile(
      `imagens/${file.originalname}`,
      file.buffer,
      file.mimetype
    )

    return res.status(201).json(arquivo)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
})

//upload de multiplos arquivos
app.post('/upload-multiple', multer.array('arquivo'), async (req, res) => {
  const { files } = req

  try {
    const resultado = []

    for (const file of files) {
      const arquivo = await uploadFile(
        `imagens/${file.originalname}`,
        file.buffer,
        file.mimetype
      )

      resultado.push(arquivo)
    }

    return res.json(resultado)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
})

//listar arquivos
app.get('/arquivos', async (req, res) => {
  try {
    const files = await listagemArquivos()

    return res.json(files)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
})

//deletar arquivo
app.delete('/arquivo', async (req, res) => {
  const { file } = req.query

  try {
    await excluirArquivo(file)

    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
})

app.listen(process.env.PORT)