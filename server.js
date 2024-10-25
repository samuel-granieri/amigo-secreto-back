import mongoose from 'mongoose'
import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';



const app = express();
app.use(cors());
const port = 3443


const options = {
    key: fs.readFileSync(path.join('./', 'certificados', 'key.pem')),
    cert: fs.readFileSync(path.join('./', 'certificados', 'cert.pem'))
  };


//Conexao banco
const uri = `mongodb+srv://mongodb:mongodb@clusteramigosecreto.vqz6x.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAmigoSecreto`



//Definicao modelo
const userSchema = new mongoose.Schema({
    nome: String,
    sapato: String,
    blusa: String,
    calca: String,
    observacoes: String
})

const Users = mongoose.model('Users', userSchema);


// Middleware para analisar o corpo das requisições em JSON
app.use(express.json());


//funcoes de leitura e escrita
const getAllUsers = async () => {
    let status
    const client = new MongoClient(uri);
    try {
        
        await client.connect();

        const database = client.db('test'); // Nome do banco de dados
        const collection = database.collection('users'); // Nome da coleção

        const cursor = collection.find();

        const users = await cursor.toArray()
        status = {message: 'Success!', data: users}
        return status
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }finally{
        await client.close();
    }
};

const insertUsers = async (param) => {
    let status
    const client = new MongoClient(uri);
    try {
        console.log(param)
        await client.connect()

        const database = client.db('test'); // Nome do banco de dados
        const collection = database.collection('users'); // Nome da coleção

        const newUser = await collection.insertOne(param);
        status = {message: 'Success!', data: newUser}
        return status
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }finally{
        await client.close()
    }
};

const updateUsers = async (param) => {
    let status
    const client = new MongoClient(uri);
    try { 
        
        await client.connect();

        const database = client.db('test'); // Nome do banco de dados
        const collection = database.collection('users'); // Nome da coleção

        const objectId = new ObjectId(param._id);
    
        const filter = {_id: objectId}

        const updateDoc = {
            $set: {
                nome: param.nome,
                sapato: param.sapato,
                blusa: param.blusa,
                calca: param.calca,
                observacoes: param.observacoes
            }
        }

        const updatedUser = await collection.updateOne(filter, updateDoc);
        status = {message: 'Success!', data: updatedUser}
        return status
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }finally{
        await client.close()
    }
};


const deleteUsers = async (param) => {
    let status
    const client = new MongoClient(uri);
    try { 
        
        await client.connect();

        const database = client.db('test'); // Nome do banco de dados
        const collection = database.collection('users'); // Nome da coleção

        const objectId = new ObjectId(param._id);
    
        const filter = {_id: objectId}


        const deleteUser = await collection.deleteOne(filter);
        status = {message: 'Success!', data: deleteUser}
        return status
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }finally{
        await client.close()
    }
};


//Buscar usuarios
app.get('/getUsers', async (req, res) => {
    try {
        const data = await getAllUsers()
        res.json(data); // Retorna os dados em formato JSON
    } catch (error) {
        console.error('Erro ao buscar dados:', error); // Registra o erro no console
        return res.status(500).json({ error: error.message }); // Retorna uma resposta de erro ao cliente
    }
});


//Inserir usuarios
app.post('/insertUser', async (req, res) => {
    try {
        const data = await insertUsers(req.body)
        res.json(data); // Retorna os dados em formato JSON
    } catch (error) {
        console.error('Erro ao buscar dados:', error); // Registra o erro no console
        return res.status(500).json({ error: error.message }); // Retorna uma resposta de erro ao cliente
    }
});

//Alterar usuarios
app.post('/updateUser', async (req, res) => {
    try {
        const data = await updateUsers(req.body)
        res.json(data); // Retorna os dados em formato JSON
    } catch (error) {
        console.error('Erro ao buscar dados:', error); // Registra o erro no console
        return res.status(500).json({ error: error.message }); // Retorna uma resposta de erro ao cliente
    }
});

//Deletar usuarios
app.post('/deleteUser', async (req, res) => {
    try {
        const data = await deleteUsers(req.body)
        res.json(data); // Retorna os dados em formato JSON
    } catch (error) {
        console.error('Erro ao buscar dados:', error); // Registra o erro no console
        return res.status(500).json({ error: error.message }); // Retorna uma resposta de erro ao cliente
    }
});


// Iniciando o servidor
//app.listen(port, () => {
https.createServer(options, app).listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!!`);
});
