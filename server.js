const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Conexão com o Firebase usando a variável de ambiente do Render
const serviceAccount = JSON.parse(process.env.FIREDATABASE);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. Servir arquivos estáticos (HTML, CSS, JS) para o site abrir no navegador
app.use(express.static('.'));

// Rota para a página inicial (evita o erro "Cannot GET /")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. Rota para LISTAR os vinis (GET) - Para a sua Vitrine
app.get('/discos', async (req, res) => {
  try {
    const snapshot = await db.collection('discos').get();
    const discos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(discos);
  } catch (error) {
    res.status(500).send("Erro ao buscar discos: " + error.message);
  }
});

// 4. Rota para ADICIONAR discos (POST) - Para o seu Painel Admin
app.post('/discos', async (req, res) => {
  try {
    const novoDisco = req.body; 
    const docRef = await db.collection('discos').add(novoDisco);
    res.status(201).json({ id: docRef.id, mensagem: "Disco adicionado!" });
  } catch (error) {
    res.status(500).send("Erro ao salvar: " + error.message);
  }
});

// 5. Rota para receber um novo pedido de VENDA
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