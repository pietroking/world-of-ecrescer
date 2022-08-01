import { equiparItem, desequiparItem } from "./personagens"
import { useQuestion } from '../src/services/question/use-question'
//   const nome = await useQuestion('Qual o seu nome?')

// {
// 	nome: 'Espada curta',
// 	tipo: 'DANO',
// 	preço: 20,
// 	aprimoramento: '2',
// 	lvlMinimo: 0,
// {,
// {
// 	nome: 'Glaives do Illidan',
// 	tipo: 'DANO',
// 	preço: 200,
// 	aprimoramento: '20',
// 	lvlMinimo: 10,
//     idExpansao: 1 // pode ou não existir esse atributo
// {,
// {
// 	nome: 'Burning Crusade',
// 	idExpansao: 1
// 	tipo: 'EXPANSAO',
// 	preço: 200000,
// }

export async function buyItem(personagem, item, expansoes){
    const requirements = itemRequirement(personagem, item, expansoes)
    let novoPersonagem
    if(requirements[0] && requirements[1] && personagem.dinheiro >= item.preco){
        if(item.tipo == 'EXPANSAO'){
            personagem.dinheiro -= item.preco
            expansoes.push(item.idExpansao)
            return personagem
        }else{
        novoPersonagem = await itemSwap(personagem, item)
        if(novoPersonagem != false){
            novoPersonagem.dinheiro -= item.preco
            console.log(`Sua compra foi efetuada com sucesso.
            Seus novos status são: 
            DANO: ${novoPersonagem.dano}
            VIDA: ${novoPersonagem.vida}
            VIGOR: ${novoPersonagem.vigor}`)
            return novoPersonagem
        }
    }
    }else {
        if(requirements[0] == false){
            console.log('Você não possui a expansão necessária')}
        if(requirements[1] == false){
        console.log('Você não possui o level mínimo necessário')}
        if(personagem.dinheiro < item.preco){
            console.log('Você não possui bitcoins suficientes.')}
        return false
    }
}

async function itemSwap(personagem, item){
    let itemDoMesmoTipo = null
    if(personagem.equipamento != undefined){
        for (let index = 0; index < personagem.equipamento.length; index++) {
            if(personagem.equipamento[i].tipo == item.tipo){
                itemDoMesmoTipo = i
            }
        }
    }
    if(itemDoMesmoTipo != null){
        console.log(`Você já possui um item deste tipo, caso você compre ${item.nome} seu item ${personagem.equipamento[itemDoMesmoTipo].nome} será substituído.`)
        const resposta = await useQuestion('Tem certeza que deseja efetuar a compra?(S/N)')
        if(resposta.toLowerCase() == "s"){
            return equiparItem(personagem, item)
        }
    }else{
        return equiparItem(personagem, item)
    }
    return false
}

function itemRequirement(personagem, item, expansoes){
    const answerExpansionLevel = [false, false]
    if (item.hasOwnProperty('idExpansao')){ //testa se precisa expansão
        if(expansoes != undefined && (expansoes.includes(item.idExpansao) || item.tipo == 'EXPANSAO')){ //testa se possui a expasão OU se o item é uma expansão
            answerExpansionLevel[0]= true
        }
    }else{answerExpansionLevel[0] = true}

    if(item.hasOwnProperty('lvlMinimo')){ //testa se precisa de nível mínimo
        if(personagem.nivel >= item.lvlMinimo){ //testa se personagem possui nível mínimo
            answerExpansionLevel[1]= true
        }
    }
    else{answerExpansionLevel[1] = true}

    return answerExpansionLevel
}

export function sellItem(personagem, item){
    if (!item.hasOwnProperty('preco')){
        item = {...item, 'preco': 0}
    }
    personagem.dinheiro += (item.preco/2)
    personagem = desequiparItem(personagem, item)
    return personagem
}