//importar o mongoose
const mongoose = require('mongoose')
//scripts de conexão
const conn = async()=>{
    const atlas = await mongoose.connect('mongodb+srv://userLR:loginregistro@cluster0.9add4.mongodb.net/fiap')
}

//exportar as infomações para acesso externo
module.exports = conn 