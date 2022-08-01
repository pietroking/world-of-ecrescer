import axios from "axios";

import {
    dano,
    batalhar
  } from '../src/batalha'

import {
    getRaca,
    buscarRacaLista,
    criarPersonagem,
    addRacaPersonagem,
    equiparItem,
    upLevel
} from '../src/personagens'

let arrayRacas
let arrayMissoes
let arrayItens
let expansoesTest
let personagenstest
let itenstest

beforeAll(async () => {
  arrayRacas = await (await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/races.json')).data
  arrayMissoes = await (await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/quests.json')).data
  arrayItens = await (await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/store.json')).data
  expansoesTest = [0, 1, 2, 3, 4, 5, 6, 7]
  personagenstest = [{nome: 'PIETRO',
                     raca: 'Humano',
                     equipamentos: [],
                     nivel: 100,
                     dinheiro: 0,
                     vida: 100,
                     vigor: 100,
                     dano: 100}]
})



  describe('testes batalha', () => {
    it('Deve conseguir declarar empate em uma batalha', async () => {
      const personagemSelecionado = personagenstest[0]

      const p1 = {
        nome: 'Pietro',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 6,
        vigor: 4,
        dano: 4
      }


      let personagemCriado = await criarPersonagem('ORCTEST')
      personagemCriado = await addRacaPersonagem(personagemCriado, 'Orc', expansoesTest, personagenstest, arrayRacas, personagemSelecionado)
      // console.log(personagemCriado)
      // console.log(p1)
      // personagemCriado = upLevel(personagemCriado,5)
      // personagemCriado = upLevel(personagemCriado,1)
      let vencedor = batalhar(p1, personagemCriado)
      // batalhar(p1, personagemCriado)
      // console.log(personagemCriado)
      // console.log(p1)

      //console.log(vencedor)

      expect(vencedor).toEqual('EMPATE')
    })


    it('Deve conseguir finalizar a batalha e obter um vencedor com sucesso', async () => {
      const personagemSelecionado = personagenstest[0]

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 5,
        vigor: 1,
        dano: 4
      }


      let personagemCriado = await criarPersonagem('HUMANOTESTE')
      personagemCriado = await addRacaPersonagem(personagemCriado, 'Humano', expansoesTest, personagenstest, arrayRacas, personagemSelecionado)

      personagemCriado = upLevel(personagemCriado,5)
      personagemCriado = upLevel(personagemCriado,1)
      // console.log(personagemCriado)
      // console.log(p1)
      let vencedor = batalhar(p1, personagemCriado)

      // vencedor = upLevel(vencedor,1)

      // // batalhar(p1, personagemCriado)
      // // console.log(personagemCriado)
      // // console.log(p1)
      // console.log(personagemCriado)
      // console.log(vencedor)

      expect(vencedor).toEqual(personagemCriado)
    })

    it('Deve conseguir finalizar a batalha e obter um vencedor com sucesso', async () => {
      const personagemSelecionado = personagenstest[0]

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 5,
        vigor: 1,
        dano: 4
      }


      let personagemCriado = await criarPersonagem('HUMANOTESTE')
      personagemCriado = await addRacaPersonagem(personagemCriado, 'Humano', expansoesTest, personagenstest, arrayRacas, personagemSelecionado)

      personagemCriado = upLevel(personagemCriado,5)
      personagemCriado = upLevel(personagemCriado,1)
      // console.log(personagemCriado)
      // console.log(p1)
      let vencedor = batalhar(personagemCriado, p1)

      // vencedor = upLevel(vencedor,1)

      // // batalhar(p1, personagemCriado)
      // // console.log(personagemCriado)
      // // console.log(p1)
      // console.log(personagemCriado)
      // console.log(vencedor)

      expect(vencedor).toEqual(personagemCriado)
    })

    it('1', async () => {

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 50,
        vigor: 2,
        dano: 4
      }

      const p2 = {
        nome: 'Matheus',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 60,
        vigor: 1,
        dano: 3
      }

      let vencedor = batalhar(p2, p1)

      expect(vencedor).toEqual(p1)
    })

    it('2', async () => {

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 50,
        vigor: 2,
        dano: 4
      }

      const p2 = {
        nome: 'Matheus',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 60,
        vigor: 1,
        dano: 3
      }

      let vencedor = batalhar(p1, p2)

      expect(vencedor).toEqual(p1)
    })

    it('3', async () => {

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 50,
        vigor: 2,
        dano: 4
      }

      const p2 = {
        nome: 'Matheus',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 60,
        vigor: 1,
        dano: 3
      }

      let vencedor = batalhar(p2, p1)

      expect(vencedor).toEqual(p1)
    })

    it('4', async () => {

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 50,
        vigor: 2,
        dano: 4
      }

      const p2 = {
        nome: 'Matheus',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 60,
        vigor: 1,
        dano: 3
      }

      let vencedor = batalhar(p1, p2)

      expect(vencedor).toEqual(p1)
    })

    it('4', async () => {

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 50,
        vigor: 2,
        dano: 4
      }

      const p2 = {
        nome: 'Matheus',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 60,
        vigor: 1,
        dano: 3
      }

      let vencedor = batalhar(p2, p1)

      expect(vencedor).toEqual(p1)
    })

    it('5', async () => {

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 50,
        vigor: 2,
        dano: 4
      }

      const p2 = {
        nome: 'Matheus',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 60,
        vigor: 1,
        dano: 3
      }

      let vencedor = batalhar(p1, p2)

      expect(vencedor).toEqual(p1)
    })

    it('6', async () => {

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 50,
        vigor: 2,
        dano: 4
      }

      const p2 = {
        nome: 'Matheus',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 60,
        vigor: 1,
        dano: 3
      }

      let vencedor = batalhar(p2, p1)

      expect(vencedor).toEqual(p1)
    })

    it('7', async () => {

      const p1 = {
        nome: 'Pietro',
        raca: 'Elfo Sangrento',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 50,
        vigor: 2,
        dano: 4
      }

      const p2 = {
        nome: 'Matheus',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 0,
        vida: 60,
        vigor: 1,
        dano: 3
      }

      let vencedor = batalhar(p1, p2)

      expect(vencedor).toEqual(p1)
    })


})