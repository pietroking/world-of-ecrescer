import { useQuestion } from './src/services/question/use-question';
import { useLocalStorage } from './src/services/local-storage/use-local-storage';
import { getListaRacas, getListaItens, getListaQuests } from './src/listaJson';
import { criarPersonagem, addRacaPersonagem, upLevel } from './src/personagens';
import { batalhar } from './src/batalha';
import { selectQuest, doQuest } from './src/quests';
import { buyItem, sellItem } from './src/store';
import { recebeCheats } from './src/cheats'
import { exp } from 'mathjs';

const localStorage = useLocalStorage();

export async function main(){
    if (localStorage.getObject('personagens') == null) {    //cria listas no banco caso não exista nenhuma
        localStorage.setObject('personagens', []);
    }
    if (localStorage.getObject('expansoes') == null) {  //cria listas no banco caso não exista nenhuma
        localStorage.setObject('expansoes', []);
    }
    const listaRacas = await getListaRacas();
    const listaItens = await getListaItens();
    const listaQuests = await getListaQuests();
    let opcao;

    while(opcao !== '3'){
    let personagens = localStorage.getObject('personagens');
    let expansoes = localStorage.getObject('expansoes');
    
    let expansoesNomes = [];
    

    for (let i = 0; i <expansoes.length; i++) {
        let auxNome = listaItens.find(e => {
            if((e.tipo === 'EXPANSAO') && (e.idExpansao === expansoes[i])){
                return e.nome
        }})
        expansoesNomes.push(auxNome.nome)
    }
        console.clear();
        
        opcao = (await useQuestion(`
                    World of E-crescer

        ${expansoesNomes}

                       Menu de Jogador
    
    
    1 - Criar Personagem
    2 - Selecionar Personagem
    3 - Sair
            `)).toUpperCase();
    
            switch (opcao) {
                case '1':
                    await createCharacter(personagens, expansoes, listaRacas);
                    localStorage.setObject('personagens', personagens);
                    break;
                case '2':
                    if(personagens != null){
                        for (let index = 0; index < personagens.length; index++) {
                            console.log(`${index} - ${personagens[index].nome}, ${personagens[index].nivel}`)
                        }
                    }
                    let indicePersonagem = await useQuestion("Digite o indice de qual personagem você gostaria de selecionar.")
                    await menuCharacter(indicePersonagem, personagens, listaItens, expansoes, listaQuests)
                    break;
                case '3':
                    break;
                default:
                    if(recebeCheats(opcao, false, personagens)){
                        localStorage.setObject('personagens', personagens)
                        await useQuestion("Aperte enter para continuar")
                    }else{
                        console.log('Opção inválida!');
                        await useQuestion("Aperte enter para continuar")
                    }
            }
        }
}

async function createCharacter(personagens, expansoes, races){
    console.clear();
    let nome = await useQuestion(`
                World of E-crescer

    Nome do novo personagem:
    `);
    let novopersonagem = await criarPersonagem(nome)
    console.log(`
    Raça do novo personagem:

    0 - Cancelar criação
    `);
    for (let index = 0; index < races.length; index++) {
        if(races[index].tipo == 'NORMAL'){
           console.log(races[index].id + ' - ' + races[index].raca + ' - status base - vida:'+ races[index].vidaBase + ', dano:'+races[index].danoBase + ', vigor:'+ races[index].vigorBase); 
        }else{
            console.log(races[index].id + ' - ' + races[index].raca + ' - status base - vida:'+ races[index].vidaBase + ', dano:'+races[index].danoBase + ', vigor:'+ races[index].vigorBase + '- idExpansao:'+ races[index].idExpansao + ' - Lvl Minimo:'+ races[index].lvlMinimoParaObter);
        }

    }
    let laco = true;
    while(laco){
        let racaId = await useQuestion('')
        if( !recebeCheats(racaId, false, personagens) ){
            racaId = parseInt(racaId);
            if (racaId == 0) {
                laco = false;
            }
            else if(racaId > races.length || racaId < 0){
                console.log('Opçao invalida' + '\n' + 'Digite outra opçao:');
            }
            else if(racaId == null){
                console.log('Digite uma opçao:');
            }
            else{
                let personagemCriado = addRacaPersonagem(novopersonagem, racaId, expansoes, personagens, races);
                await useQuestion("Aperte enter para continuar")
                laco = false;
            }
        }
        localStorage.setObject('personagens', personagens);
    }
}

async function menuCharacter(personagem, personagens, items, expansoes, quests){
    let op
    let expansoesNomes2 = []
    for (let i = 0; i <expansoes.length; i++) {
        let auxNome = items.find(e => {
            if((e.tipo === 'EXPANSAO') && (e.idExpansao === expansoes[i])){
                return e.nome
        }})
        expansoesNomes2.push(auxNome.nome)
    }

    op = await useQuestion(`
                    World of E-crescer

        ${expansoesNomes2}

                Personagem selecionado: ${personagens[personagem].nome}
                                Nível:   ${personagens[personagem].nivel}
                                Vida:   ${personagens[personagem].vida}
                                Dano:   ${personagens[personagem].dano}
                                Vigor:  ${personagens[personagem].vigor}
                                Dinheiro: ${personagens[personagem].dinheiro}
                       
    
        1 - Batalhar  (AQUI É O COLISEU, ENTROU NAO TEM MAIS VOLTA)
        2 - Realizar Missões
        3 - Loja
        4 - Sair

            `);

    switch (op) {
        case '1':
            await battleCharacters(personagem, personagens);
            localStorage.setObject('personagens', personagens);
            break;
        case '2':
            // realizar missão
            for (let i = 0; i < quests.length; i++) {
                console.log(`${quests[i].id} - Missão: ${quests[i].descricao}, Recompensas-> Niveis: ${quests[i].niveisRecebidos}, Bitcoins: ${quests[i].dinheiroRecebido}`)
                if(quests[i].hasOwnProperty('lvlMinimo')){
                    console.log(`Level Mínimo: ${quests[i].lvlMinimo}`)
                }
                if(quests[i].hasOwnProperty('idExpansao')){
                    let procuraExpansao = items.find(element => {if(element.idExpansao == quests[i].idExpansao && element.tipo == 'EXPANSAO'){
                        return element}})
                    console.log(`Expansão necessária: ${procuraExpansao.nome}` )
                }
            }
            let missaoDigitada = await useQuestion("Digite o índice da quest que gostaria de realizar.")
            let missaoSelecionada = await selectQuest(missaoDigitada, quests, expansoes)
            if(missaoSelecionada !== -1 && missaoSelecionada != null){
                personagens[personagem] = await doQuest(personagens[personagem], missaoSelecionada);
                localStorage.setObject('personagens', personagens);
            }else{
                if(recebeCheats(missaoDigitada, personagem, personagens) != false){
                    localStorage.setObject('personagens', personagens)
                }else{
                    console.log('Você não possui os pré-requisitos para executar essa missão, tente outra!');
                }
            }
            await useQuestion("Aperte enter para continuar")
            break;
        case '3':
            return await menuStore(personagem, personagens, items, expansoes);//comprar item
        case '4':
            return 4;
        default:
            if(recebeCheats(op, personagem, personagens) != false){
                localStorage.setObject('personagens', personagens)
                await useQuestion("Aperte enter para continuar")
            }else{
                console.log('Opção inválida!');
                await useQuestion("Aperte enter para continuar")
            }
    }
}

export async function menuStore(personagem, personagens, items, expansoes){
    let opcao = (await useQuestion(`
                        World of E-crescer
    
    
                    Menu do personagem: ${personagens[personagem].nome}
                           
        
            1 - Comprar item
            2 - Vender item
    
                `));
    
        switch (opcao) {
            case '1':
                for (let i = 0; i < items.length; i++) {
                    if(!personagens[personagem].equipamentos.includes(items[i])){
                        if((expansoes.includes(items[i].idExpansao) && items[i].tipo == 'EXPANSAO')){

                        }else{
                            console.log(`${i} - Nome: ${items[i].nome}, Tipo: ${items[i].tipo}, Aprimoramento: ${items[i].aprimoramento}, Preço: ${items[i].preco}`)
                            if(items[i].hasOwnProperty('lvlMinimo')){
                                console.log(`Level Mínimo: ${items[i].lvlMinimo}`)
                            }
                            if(items[i].hasOwnProperty('idExpansao') && items[i].tipo != 'EXPANSAO'){
                                let procuraExpansao = items.find(element => {if(element.idExpansao == items[i].idExpansao && element.tipo == 'EXPANSAO'){
                                    return element}})
                                console.log(`Expansão necessária: ${procuraExpansao.nome}` )
                            }
                        }
                    }
                }
                let itemComprado = await useQuestion("Digite o indice do item que você gostaria de comprar: ")
                if(!personagens[personagem].equipamentos.includes(items[itemComprado]) && items[itemComprado] != null){
                    await buyItem(personagens[personagem], items[itemComprado], expansoes);
                    if(items[itemComprado].tipo === 'EXPANSAO'){
                        localStorage.setObject('expansoes', expansoes);
                        localStorage.setObject('personagens', personagens);
                    }else{
                        localStorage.setObject('personagens', personagens);
                    }
                }else{
                    if(recebeCheats(itemComprado, personagem, personagens)){
                        console.log("Cheat Ativado.")
                    }else{
                        console.log("Opção inválida.")
                    }
                }
                await useQuestion("Aperte enter para continuar")
                break;
            case '2':
                for (let index = 0; index < personagens[personagem].equipamentos.length; index++) {
                    console.log(`${index} - Nome: ${personagens[personagem].equipamentos[index].nome}, Tipo: ${personagens[personagem].equipamentos[index].tipo}, Aprimoramento: ${personagens[personagem].equipamentos[index].aprimoramento}, Preço: ${personagens[personagem].equipamentos[index].preco}`)
                }
                let itemVendido = await useQuestion("Digite o índice de qual item você gostaria de vender(você receberá metade do preço pago por ele): ")
                
                if(personagens[personagem].equipamentos[itemVendido] != undefined){
                    await sellItem(personagens[personagem], personagens[personagem].equipamentos[itemVendido], expansoes);
                    localStorage.setObject('personagens', personagens);
                }else{
                    if(recebeCheats(itemVendido, personagem, personagens)){
                        console.log("Cheat Ativado.")
                    }else{
                        console.log("Operação cancelada.")
                    }
                }
                await useQuestion("Aperte enter para continuar")
                break;
            case '3':
                break
            default:
                if(recebeCheats(opcao, personagem, personagens)){
                    localStorage.setObject('personagens', personagens)
                    await useQuestion("Aperte enter para continuar")
                }else{
                    console.log('Opção inválida!');
                    await useQuestion("Aperte enter para continuar")
                }
        }
    }

    export async function battleCharacters(personagem, personagens){
        console.clear();
        console.log(`
            World of E-crescer
        
        
        Menu do personagem: ${personagens[personagem].nome}
        
    
    Selecione o adversario:
    `);
        for (let index = 0; index < personagens.length; index++) {
            if(index != personagem){
            console.log((index) + ' - ' + personagens[index].nome);
            }
        }
        let p2 = await useQuestion('')
        const vencedor = batalhar(personagens[personagem], personagens[p2]);
        if (vencedor == 'EMPATE') {
            console.log('Os 2 se cansaram e decidiram q um EMPATE era melhor q ficar ali');
            await useQuestion("Aperte enter para continuar")
        }else{
            if (vencedor == personagens[personagem]){
                personagens[personagem] = upLevel(personagens[personagem],1);
                console.log('O vencedor da batalha é '+ personagens[personagem].nome+ '\n'+ 'Seu Lvl subiu para: '+ personagens[personagem].nivel);
                await useQuestion("Aperte enter para continuar")
            }else{
                personagens[p2] = upLevel(personagens[p2],1);
                console.log('O vencedor da batalha é '+ personagens[p2].nome+ '\n'+ 'Seu Lvl subiu para: '+ personagens[p2].nivel);
                await useQuestion("Aperte enter para continuar")
            }
        }
    }