import { number, string } from 'mathjs';
import { upLevel, equiparItem } from './personagens.js';
// import { useLocalStorage } from '../services/local-storage/use-local-storage'

// const localStorage = useLocalStorage()
const ArcodoCallbackInfinito = {
    nome: 'Arco do Callback Infinito',
    tipo: 'DANO',
    aprimoramento: 2000}
const TalismãdoPolimorfismo = {
    nome: 'Talismã do Polimorfismo',
    tipo: 'VIDA',
    aprimoramento: 2000}
const TalismãIndexado = {
	nome: 'Talismã Indexado',
	tipo: 'VIDA',
	aprimoramento: 2000}
const ArmaduradeFlexbox = {
	nome: 'Armadura de Flexbox',
	tipo: 'VIGOR',
	aprimoramento: 2000}



export function recebeCheats(cheats, personagemId, personagens){
    // const player = localStorage.getObject('player')
    // let charList = player.characters
    // let p = null
    
    switch (cheats.toUpperCase()) {

        case 'WILLIDAN':
            //20 niveis para o personagem selecionado
            // p = getChar(personagemId)
            // updateChar()
            // upLevel(personagemId, 20, 0)  //UPA NIVEL, VIDA E VIGOR
            // MsgDeAplicacaoDeCheats()

            if(personagemId !== false){
                personagens[personagemId] = upLevel(personagemId, 20)
                return personagens[personagemId]
            }else{
                return false
            }   
        case 'GUSTHRALL':
            //+2000 de dinheirinhos para o personagem selecionado
            // p = getChar(personagemId)
            // p.dinheiro += 2000

            // updateChar()
            // MsgDeAplicacaoDeCheats()

            if(personagemId !== false){
                personagens[personagemId].dinheiro += 2000
                return personagens[personagemId]
            }else{
                return false
            }
        case 'ANDUINNUNES':
            // //+20000 de dinheiro para todos os personagens
            // charList.forEach((e) => {
            //     e.dinheiro += 20000
            // })

            // updateChar()
            // MsgDeAplicacaoDeCheats()
          
            personagens.forEach(p => p.dinheiro += 20000)
            return personagens
    
        case 'JULICHKING':
            //+5 niveis para todos os personagens
            // charList.forEach((e) => {
            //     upLevel(e.id, 5, 0) //UPA NIVEL, VIDA E VIGOR
            // })
         
            // MsgDeAplicacaoDeCheats()
            for (let index = 0; index < personagens.length; index++) {
                personagens[index] = upLevel(personagens[index], 5)
            }
            return personagens

        case 'KEVINERZUL':
            //O Personagem recebe o seguinte item 'Arco do Callback Infinito'
            // p = getChar(personagemId)
            // p.equipamentos.dano = {
            //     nome: 'Arco do Callback Infinito',
            //     tipo: 'DANO',
            //     aprimoramento: '2000',
            // }

            // updateChar()
            // MsgDeAplicacaoDeCheats()
            if(personagemId !== false){
                let personagemParametro
                if(typeof personagemId == 'string'){
                    personagemParametro = personagens[parseInt(personagemId)]
                }else{
                    personagemParametro = personagemId
                }
                personagens[personagemId] = equiparItem(personagemParametro, ArcodoCallbackInfinito)
                return personagens[personagemId]
            }else{
                return false
            }
    
        case 'FABYOGGSARON':
            //O personagem recebe o seguinte item 'Talismã do Polimorfismo'
            // p = getChar(personagemId)
            // p.equipamentos.vida = {
            //     nome: 'Talismã do Polimorfismo',
            //     tipo: 'VIDA',
            //     aprimoramento: '2000',
            // }

            // updateChar()
            // MsgDeAplicacaoDeCheats()
            if(personagemId !== false){
                let personagemParametro
                if(typeof personagemId == 'string'){
                    personagemParametro = personagens[parseInt(personagemId)]
                }else{
                    personagemParametro = personagemId
                }
                personagens[personagemId] = equiparItem(personagemParametro, TalismãdoPolimorfismo)
                return personagens[personagemId]
            }else{
                return false
            }

        case 'PABLOTHAR':
            //O personagem recebe o seguinte item 'Talismã do Polimorfismo'
            // p = getChar(personagemId)
            // p.equipamentos.vida = {
            //     nome: 'Talismã do Polimorfismo',
            //     tipo: 'VIDA',
            //     aprimoramento: '2000',
            // }

            // updateChar()
            // MsgDeAplicacaoDeCheats()
            if(personagemId !== false){
                let personagemParametro
                if(typeof personagemId == 'string'){
                    personagemParametro = personagens[parseInt(personagemId)]
                }else{
                    personagemParametro = personagemId
                }
                personagens[personagemId] = equiparItem(personagemParametro, TalismãdoPolimorfismo)
                return personagens[personagemId]
            }else{
                return false
            }
    
        case 'VITOREXXAR':
            //O personagem recebe o seguinte item 'Talismã do Polimorfismo'
            // p = getChar(personagemId)
            // p.equipamentos.vida = {
            //     nome: 'Talismã do Polimorfismo',
            //     tipo: 'VIDA',
            //     aprimoramento: '2000',
            // }

            // updateChar()
            // MsgDeAplicacaoDeCheats()

            if(personagemId !== false){
                let personagemParametro
                if(typeof personagemId == 'string'){
                    personagemParametro = personagens[parseInt(personagemId)]
                }else{
                    personagemParametro = personagemId
                }
                personagens[personagemId] = equiparItem(personagemParametro, TalismãdoPolimorfismo)
                return personagens[personagemId]
            }else{
                return false
            }

        case 'ZORZARTHAS':
            //O personagem recebe o seguinte item 'Talismã Indexado'
            // p = getChar(personagemId)
            // p.equipamentos.vida = {
            //     nome: 'Talismã Indexado',
            //     tipo: 'VIDA',
            //     aprimoramento: '2000',
            // }

            // updateChar()
            // MsgDeAplicacaoDeCheats()
            if(personagemId !== false){
                let personagemParametro
                if(typeof personagemId == 'string'){
                    personagemParametro = personagens[parseInt(personagemId)]
                }else{
                    personagemParametro = personagemId
                }
                personagens[personagemId] = equiparItem(personagemParametro, TalismãIndexado)
                return personagens[personagemId]
            }else{
                return false
            }

        case 'DIANDRAKA':
            //O personagem recebe o seguinte item 'Talismã Indexado'
            // p = getChar(personagemId)
            // p.equipamentos.vida = {
            //     nome: 'Talismã Indexado',
            //     tipo: 'VIDA',
            //     aprimoramento: '2000',
            // }

            // updateChar()
            // MsgDeAplicacaoDeCheats()
            if(personagemId !== false){
                let personagemParametro
                if(typeof personagemId == 'string'){
                    personagemParametro = personagens[parseInt(personagemId)]
                }else{
                    personagemParametro = personagemId
                }
                personagens[personagemId] = equiparItem(personagemParametro, TalismãIndexado)
                return personagens[personagemId]
            }else{
                return false
            }
    
        case 'SERGIORGRIM':
            //O personagem recebe o seguinte item 'Talismã Indexado'
            // p = getChar(personagemId)
            // p.equipamentos.vigor = {
            //     nome: 'Armadura de Flexbox',
            //     tipo: 'VIGOR',
            //     aprimoramento: '2000',
            // }

            // updateChar()
            // MsgDeAplicacaoDeCheats()
            if(personagemId !== false){
                let personagemParametro
                if(typeof personagemId == 'string'){
                    personagemParametro = personagens[parseInt(personagemId)]
                }else{
                    personagemParametro = personagemId
                }
                personagens[personagemId] = equiparItem(personagemParametro, ArmaduradeFlexbox)
                return personagens[personagemId]
            }else{
                return false
            }
            
        default:
            return false
    }

    // function getChar(id){
    //     return charList.find((e) => {
    //         return e.id == id
    //     })
    // }

    // function updateChar(){
    //     player.characters = charList
    //     localStorage.setObject('player', player)
    // }

    // function MsgDeAplicacaoDeCheats(){
    //     setTimeout( async () => {console.log("CHEAT ATIVADO")},2000)
    // }

}