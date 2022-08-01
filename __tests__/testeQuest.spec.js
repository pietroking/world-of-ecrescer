import { selectQuest, doQuest } from "../src/quests"
import { getListaQuests, getListaRacas } from "../src/listaJson"

describe('Testes quests', () => {

        it('Deve conseguir receber a lista de missões',async () =>  {
            const valorRecebido = await getListaQuests()
            const x = await getListaRacas()
            const valorEsperado = [{"descricao": "Limpar os canecos da taberna", "dinheiroRecebido": 10,"id": 1, "niveisRecebidos": 0, "tempoEstimado": 5000}, 
                  {"descricao": "Limpar a taberna", "dinheiroRecebido": 20, "id": 2, "niveisRecebidos": 0, "tempoEstimado": 15000}, 
                  {"descricao": "Batalhar contra Murloc", "dinheiroRecebido": 0, "id": 3, "niveisRecebidos": 1, "tempoEstimado": 20000}, 
                  {"descricao": "Batalhar contra Ogro", "dinheiroRecebido": 0, "id": 4, "niveisRecebidos": 2, "tempoEstimado": 30000}, 
                  {"descricao": "Defender uma cidade de ataques de Worgs", "dinheiroRecebido": 70, "id": 5, "niveisRecebidos": 3, "tempoEstimado": 90000}, 
                  {"descricao": "Vencer o campeonato de quem bebe mais cerveija amanteigada", "dinheiroRecebido": 100, "id": 6, "niveisRecebidos": 1, "tempoEstimado": 120000}, {"descricao": "Derrotar o Lich", "dinheiroRecebido": 170, "id": 7, "niveisRecebidos": 8, "tempoEstimado": 300000}, {"descricao": "Capturar um Dragão", "dinheiroRecebido": 400, "id": 8, "niveisRecebidos": 17, "tempoEstimado": 1800000}, {"descricao": "Limpar a casa do Deathwing", "dinheiroRecebido": 1000000000, "id": 9, "idExpansao": 3, "niveisRecebidos": 0, "tempoEstimado": 4000000000}, {"descricao": "Alimentar a Al'ar", "dinheiroRecebido": 150, "id": 10, "idExpansao": 1, "niveisRecebidos": 0, "tempoEstimado": 40000}, {"descricao": "Esquiar em Northrend", "dinheiroRecebido": 100, "id": 11, "idExpansao": 2, "niveisRecebidos": 1, "tempoEstimado": 60000}, {"descricao": "Vencer torneio de Kung-Fu", "dinheiroRecebido": 350, "id": 12, "idExpansao": 4, "niveisRecebidos": 5, "tempoEstimado": 180000}, {"descricao": "Limpar Warglaives de Ilidan", "dinheiroRecebido": 200, "id": 13, "idExpansao": 6, "niveisRecebidos": 0, "tempoEstimado": 30000}, {"descricao": "Lutar em Azeroth", "dinheiroRecebido": 0, "id": 14, "idExpansao": 7, "niveisRecebidos": 10, "tempoEstimado": 1000000}]
            expect(valorRecebido).toEqual(valorEsperado)
        })
        it('Deve conseguir encontrar uma missão por seu id ou nome',async () =>  {
            // console.log('%c Javascript is beautiful', 'color: pink; font-weight: bold; background-color: black;')
            const valorRecebido = await selectQuest("Limpar os canecos da taberna", await getListaQuests(), []) 
            const valorEsperado = {"descricao": "Limpar os canecos da taberna", "dinheiroRecebido": 10, "id": 1, "niveisRecebidos": 0, "tempoEstimado": 5000}
            expect(valorRecebido).toEqual(valorEsperado)
        })

        it('Deve conseguir concluir uma missão corretamente e receber seus prêmios',async () =>  {
            jest.setTimeout(30000); // config que aumenta o tempo de timeout do jest para que dê tempo de realizar a missão
            const personagem = {'nome': 'Claudio', 
                'raca':{
                    id: 1,
                    raca: "Elfo Sangrento",
                    danoBase: 4,
                    vidaBase: 5,
                    vigorBase: 1,
                    tipo: 'NORMAL'
                }, 
                'equipamentos':[], 
                'nivel':1, 
                'dinheiro':0, 
                'vida':5, 
                'vigor':1, 
                'dano':4
            }
            const missoes = await getListaQuests()
            const missao = await selectQuest(1, missoes, [])
            const valorEsperado = {"dano": 4, "dinheiro": 10, "equipamentos": [], "nivel": 1, "nome": "Claudio", "raca": {"danoBase": 4, "id": 1, "raca": "Elfo Sangrento", "tipo": "NORMAL", "vidaBase": 5, "vigorBase": 1}, "vida": 5, "vigor": 1}
            
            let personagemAposMissao = await doQuest(personagem, missao)
            expect(personagemAposMissao).toEqual(valorEsperado)
        })
        
        it('Deve conseguir concluir uma missão de expansão corretamente e receber seus prêmios se já possuir a expansão',async () =>  {
            jest.setTimeout(80000); // config que aumenta o tempo de timeout do jest para que dê tempo de realizar a missão
            const personagem = {'nome': 'Claudio', 
                'raca':{
                    id: 1,
                    raca: "Elfo Sangrento",
                    danoBase: 4,
                    vidaBase: 5,
                    vigorBase: 1,
                    tipo: 'NORMAL'
                }, 
                'equipamentos':[], 
                'nivel':1, 
                'dinheiro':0, 
                'vida':5, 
                'vigor':1, 
                'dano':4   
            }
            const missoes = await getListaQuests()
            const missao = await selectQuest(10, missoes, [1])
            const valorEsperado = {"dano": 4, "dinheiro": 150, "equipamentos": [], "nivel": 1, "nome": "Claudio", "raca": {"danoBase": 4, "id": 1, "raca": "Elfo Sangrento", "tipo": "NORMAL", "vidaBase": 5, "vigorBase": 1}, "vida": 5, "vigor": 1}
            
            let personagemAposMissao = await doQuest(personagem, missao)
            expect(personagemAposMissao).toEqual(valorEsperado)
        })
    }
  )