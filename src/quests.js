import axios from "axios"
import { upLevel } from "./personagens"
import { getListaQuests } from "./listaJson"

// export function getQuestByIdOuNome(idOuDescricao, quests) {
    
//   const resultado = quests.find(quest => { 
//         return quest.id == idOuDescricao || quest.descricao == idOuDescricao
//     })
//     return resultado
//  }


export function selectQuest(idOuDescricao, missoes, expansoes) {
    const missao = missoes.find(quest => { 
        return quest.id == idOuDescricao || quest.descricao == idOuDescricao
    })

    if ( missao != null && missao != undefined && missao.hasOwnProperty('idExpansao')) {
        if (expansoes.includes(missao.idExpansao)) {
            return missao
        } else {
            return -1
        }
    }
    return missao
}

export async function doQuest(personagem, missao) {
    
    let primeiraPalavra = missao.descricao.substring(0, missao.descricao.indexOf(" "));
    const primeiraPalavraAntiga = primeiraPalavra
    primeiraPalavra = primeiraPalavra.substr(0, primeiraPalavra.length - 1) + 'ndo'
    const mensagem = missao.descricao.replace(primeiraPalavraAntiga, primeiraPalavra)
    
    //tempo restante para conclusão (com barrinha fixa de porcentagem)

    let progressBar = "[....................]"
    let timeRemaining = missao.tempoEstimado;
    for( let i = 0; i < 20 ; ++i )
    {
        let reticencias = '.';
        for( let j = 0; j < i % 3; ++j)
        {
            reticencias += '.';
        }
        console.clear();

        progressBar = progressBar.substring(0, progressBar.indexOf(".")) + "#" + progressBar.substring(progressBar.indexOf(".")+1, progressBar.length)

        console.log(`
            World of E-crescer
        ${mensagem}${reticencias}
        Tempo estimado para finalização: ${(timeRemaining/1000) - (((timeRemaining/1000)/20)*i)}s    
        ${progressBar}
            
            `);
        await new Promise(resolve => setTimeout(resolve, (timeRemaining/20)));
    }
    console.clear();
    console.log(`
            World of E-crescer
        
        ${mensagem}...
        Tempo estimado para finalização: 0s 
        [####################]
    
    `);

    const personagemAtualizado = rewards(personagem, missao)

    if (missao.niveisRecebidos == 0) {
        console.log(`                     Parabéns!!!
        Sua missão foi concluída com sucesso, você recebeu ${missao.dinheiroRecebido} bitcoins.`)
    } else if (missao.dinheiroRecebido == 0) {
        console.log(`                     Parabéns!!!
        Sua missão foi concluída com sucesso, você recebeu ${missao.niveisRecebidos} níveis.`)
    } else {
        console.log(`                     Parabéns!!!
        Sua missão foi concluída com sucesso, você recebeu ${missao.dinheiroRecebido} em bitcoins e ${missao.niveisRecebidos} níveis.`)
    }

    return personagemAtualizado
}

export function rewards(personagem, missao) {
    let clonePersonagem = Object.assign({}, personagem)
    clonePersonagem = upLevel(clonePersonagem, missao.niveisRecebidos)
    clonePersonagem.dinheiro += missao.dinheiroRecebido
    return clonePersonagem
}