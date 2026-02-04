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
app.get('/discos', async (req, res) => {
  try {
    const snapshot = await db.collection('discos').get();
    const listaDiscos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(listaDiscos);
  } catch (error) {
    res.status(500).send("Erro ao buscar discos: " + error.message);
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