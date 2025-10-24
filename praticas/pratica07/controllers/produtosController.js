const mongoose = require('mongoose');

const Produto = require('../models/produtosModel'); // importe o modelo Produto

async function criar(req, res) {
  try {
    
    const novoProduto = await Produto.create({
      nome: req.body.nome,
      preco: req.body.preco
    });

    
    return res.status(201).json({
      _id: novoProduto._id,
      nome: novoProduto.nome,
      preco: novoProduto.preco
    });

  } catch (err) {
   
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  };
};



async function listar(req, res) {
  try {    
    const produtosCadastrados = await Produto.find({});   
    return res.status(200).json(produtosCadastrados);

  } catch (err) {   
    return res.status(500).json({ msg: 'Erro ao listar produtos' });
  };
};


async function buscar(req, res, next) {
    const { id } = req.params;  
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Parâmetro inválido' });
    }  
    try {
     
      const produtoEncontrado = await Produto.findOne({ _id: id }); 
     
      if (produtoEncontrado) {
        req.produto = produtoEncontrado;
        return next();
      }     
      return res.status(404).json({ msg: 'Produto não encontrado' });  
    } catch (err) {     
      return res.status(500).json({ msg: 'Erro ao buscar produto' });
    };
  };


  function exibir(req, res) {   
    return res.status(200).json(req.produto);
  } ;

  

async function atualizar(req, res) {
    const { id } = req.params;

    try {        
        await Produto.updateOne(
        { _id: id },
        { nome: req.body.nome, preco: req.body.preco },
        {runValidators: true}
        );       
        const produtoAtualizado = {
          _id: id,
          nome: req.body.nome, preco: req.body.preco
        }
        return res.status(200).json(produtoAtualizado);

    } catch (err) {     
       console.log(err)  
        return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
    };
};


async function remover(req, res) {
  const { id } = req.params;

  try {  
    const produtoRemovido = await Produto.findOneAndDelete({ _id: id });    
    return res.status(204).end();

  } catch (err) {    
    return res.status(500).json({ msg: 'Erro ao remover produto' });
  };
};

module.exports = { criar, listar, buscar, exibir, atualizar, remover };





