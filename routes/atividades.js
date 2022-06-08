const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{
    app.get('/atividades',async(req,res)=>{
        //capturar o id da barra de endereço
        var id = req.query.id
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:id})
        
        //buscar todas as atividades desse usuário
        var buscar = await atividades.find({usuario:id})
        //console.log(buscar)
        res.render('atividades.ejs',{nome:user.nome,id:user.id,dados:buscar})
    })
    app.post('/atividades',async(req,res)=>{
        //recuperando as informações digitadas
        var dados = req.body
        //console.log(dados)
        //conectar com o database
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulário no database
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            disciplina:dados.disciplina,
            instrucoes:dados.orientacao,
            usuario:dados.id
        }).save()
        res.redirect('/atividades?id='+dados.id)
    })

     app.get("/excluir",async(req,res)=>{
    //recuperar o parametro id da barra de endereço
        var id = req.query.id
        var excluir = await atividades.findByIdAndRemove({
            _id:id 
        })
        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+excluir.usuario)
    })
}