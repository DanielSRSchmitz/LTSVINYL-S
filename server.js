const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Conexão com o Firebase usando a variável que você criou no Render
const serviceAccount = JSON.parse(process.env.FIREDATABASE);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. Rota para listar os vinis (Vitrine)
app.post('/discos', async (req, res) => {
    try {
      const novoDisco = req.body; 
      const docRef = await db.collection('discos').add(novoDisco);
      res.status(201).json({ id: docRef.id, mensagem: "Disco adicionado!" });
    } catch (error) {
      res.status(500).send("Erro ao salvar: " + error.message);
    }
  });

// 3. Rota para receber um novo pedido de venda
app.post('/venda', async (req, res) => {
  try {
    const novoPedido = req.body; 
    const docRef = await db.collection('vendas').add({
      ...novoPedido,
      data: new Date().toISOString()
    });
    res.status(201).send({ mensagem: "Venda registrada!", id: docRef.id });
  } catch (error) {
    res.status(500).send("Erro ao salvar venda: " + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));