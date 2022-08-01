import { getListaItens } from '../src/listaJson'
import { criarPersonagem, addRacaPersonagem, equiparItem } from '../src/personagens'
import { buyItem, sellItem } from '../src/store'
import axios from "axios";

let arrayRacas
let arrayMissoes
let arrayItens
let expansoesTest
let expansoesvazias
let personagenstest

beforeAll(async () => {
  arrayRacas = await (await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/races.json')).data
  arrayMissoes = await (await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/quests.json')).data
  arrayItens = await (await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/store.json')).data
  expansoesTest = [0, 1, 2, 3, 4, 5, 6, 7]
  expansoesvazias = []
  personagenstest = [{nome: 'PIETRO',
                     raca: 'Humano',
                     equipamentos: [],
                     nivel: 100,
                     dinheiro: 100000000,
                     vida: 100,
                     vigor: 100,
                     dano: 100}]
})

describe('Testes store', () => {

        it('Deve conseguir comprar um item do tipo VIGOR com sucesso',async () =>  {
            //Arrange
            let personagemCriado = await criarPersonagem('Cláudinho-Beyblade')
            personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)

            personagemCriado.dinheiro = 20000
            const item = await getListaItens()

            let valorEsperado = {...personagemCriado, "equipamentos": []}
            valorEsperado.equipamentos.push(item[8])
            valorEsperado.vigor += item[8].aprimoramento
            valorEsperado.dinheiro -= item[8].preco
            
            //Act
            const valorRecebido = await buyItem(personagemCriado, item[8])
            
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })
        it('Deve conseguir comprar um item do tipo DANO com sucesso',async () =>  {
            //Arrange
            let personagemCriado = await criarPersonagem('Cláudinho-Beyblade')
            personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)

            personagemCriado.dinheiro = 20000
            const item = await getListaItens()
            
            let valorEsperado = {...personagemCriado, "equipamentos": []}
            valorEsperado.equipamentos.push(item[3])
            valorEsperado.dano += item[3].aprimoramento
            valorEsperado.dinheiro -= item[3].preco

            //Act
            const valorRecebido = await buyItem(personagemCriado, item[3], [])
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })
        it('Deve conseguir comprar um item do tipo VIDA com sucesso',async () =>  {
            //Arrange
            let personagemCriado = await criarPersonagem('Cláudinho-Beyblade')
            personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)

            personagemCriado.dinheiro = 20000
            const item = await getListaItens()

            let valorEsperado = {...personagemCriado, "equipamentos": []}
            valorEsperado.equipamentos.push(item[7])
            valorEsperado.vida += item[7].aprimoramento
            valorEsperado.dinheiro -= item[7].preco
            
            //Act
            const valorRecebido = await buyItem(personagemCriado, item[7])
            // console.log(personagemCriado)
            // console.log(valorRecebido)
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })
        it('Deve conseguir comprar um item do tipo EXPANSAO com sucesso',async () =>  {
            //Arrange
            let personagemCriado = personagenstest[0]
            let listaexpansoesCompradas = [6]

            const item = await getListaItens()
            let valorEsperado = {...personagemCriado, "equipamentos": []}
            
            
            //Act
            const valorRecebido = await buyItem(personagemCriado, item[18], expansoesvazias)

            // console.log(personagemCriado)
            // console.log(valorRecebido)
            // console.log(expansoesvazias)
            // console.log(listaexpansoesCompradas)
            
            //Assert
            expect(expansoesvazias).toEqual(listaexpansoesCompradas)
        })
        it('Deve conseguir comprar um equipamento de alguma expansão apenas se já tiver obtido a expansão',async () =>  {
            //Arrange
            let personagemCriado = personagenstest[0]
            let listaexpansoesCompradas = [4]

            const item = await getListaItens()
            let valorEsperado = {...personagemCriado, "equipamentos": []}
            valorEsperado.equipamentos.push(item[23])
            valorEsperado.dano += item[23].aprimoramento
            valorEsperado.dinheiro -= item[23].preco
            
            //Act
            let valorRecebido = await buyItem(personagemCriado, item[23], listaexpansoesCompradas)

            // console.log(personagemCriado)
            // console.log(valorRecebido)
            // console.log(expansoesvazias)
            // console.log(listaexpansoesCompradas)
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })

        it('Deve conseguir vender um item e receber metade do preço de volta',async () =>  {
            //Arrange
            let personagemCriado = await criarPersonagem('Cláudinho-Beyblade')
            personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
            
            personagemCriado.dinheiro = 20000
            const item = await getListaItens()

            let valorEsperado = {...personagemCriado, "equipamentos": []}
            valorEsperado.equipamentos.push(item[7])
            valorEsperado.vida += item[7].aprimoramento
            valorEsperado.dinheiro -= item[7].preco
            valorEsperado.vida -= item[7].aprimoramento
            valorEsperado.dinheiro += item[7].preco/2
            valorEsperado.equipamentos.splice(item[7],1)
            
            //Act
            let valorRecebido = await buyItem(personagemCriado, item[7])
            valorRecebido = await sellItem(personagemCriado, item[7])
            // console.log(personagemCriado)
            // console.log(valorRecebido)
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })

        it('Deve validar o nível do personagem para permitir a venda de itens com um nível mínimo necessário',async () =>  {
            //Arrange
            let personagemCriado = await criarPersonagem('Cláudinho-Beyblade')
            personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
            
            personagemCriado.dinheiro = 20000
            personagemCriado.nivel = 20
            const item = await getListaItens()

            let valorEsperado = {...personagemCriado, "equipamentos": []}
            valorEsperado.equipamentos.push(item[12])
            valorEsperado.vida += item[12].aprimoramento
            valorEsperado.dinheiro -= item[12].preco
            valorEsperado.vida -= item[12].aprimoramento
            valorEsperado.dinheiro += item[12].preco/2
            valorEsperado.equipamentos.splice(item[12],1)
            
            //Act
            let valorRecebido = await buyItem(personagemCriado, item[12], [1])
            valorRecebido = await sellItem(personagemCriado, item[12], [1])
            // console.log(personagemCriado)
            // console.log(valorRecebido)
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })

        it('Não deve conseguir comprar sem dinheiro',async () =>  {
            //Arrange
            let personagemCriado = await criarPersonagem('Cláudinho-Beyblade')
            personagemCriado = await addRacaPersonagem(personagemCriado, 2, expansoesTest, personagenstest, arrayRacas)

            personagemCriado.dinheiro = 0
            const item = await getListaItens()

            let valorEsperado = false
            
            //Act
            const valorRecebido = await buyItem(personagemCriado, item[8])
            
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })

        it('Não deve conseguir comprar sem o nível necessário',async () =>  {
            //Arrange
            let personagemCriado = await criarPersonagem('Cláudinho-Beyblade')
            personagemCriado = await addRacaPersonagem(personagemCriado, 2, expansoesTest, personagenstest, arrayRacas)

            personagemCriado.dinheiro = 20000
            personagemCriado.nivel = 0
            console.log(personagemCriado.nivel)
            const item = await getListaItens()

            let valorEsperado = false
            
            //Act
            const valorRecebido = await buyItem(personagemCriado, item[12], [1])
            console.log(item[12])
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })

        it('Não deve conseguir comprar sem a expansão necessária',async () =>  {
            //Arrange
            let personagemCriado = await criarPersonagem('Cláudinho-Beyblade')
            personagemCriado = await addRacaPersonagem(personagemCriado, 2, expansoesTest, personagenstest, arrayRacas)

            personagemCriado.dinheiro = 20000
            const item = await getListaItens()

            let valorEsperado = false
            
            //Act
            const valorRecebido = await buyItem(personagemCriado, item[18])
            
            
            //Assert
            expect(valorRecebido).toEqual(valorEsperado)
        })
    }
  )