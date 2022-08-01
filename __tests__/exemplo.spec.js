// import axios from "axios";

import {
  criarPersonagem,
  addRacaPersonagem
} from '../src/personagens'

// let arrayRacas
// let arrayMissoes
// let arrayItens

// beforeAll(async () => {
//   arrayRacas = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/races.json')
//   arrayMissoes = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/quests.json')
//   arrayItens = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/store.json')
// })

describe('Exemplo teste suite', () => {
  it('Exemplo', async() =>  {

    // console.log(arrayRacas.data)
    // console.log(arrayMissoes.data)
    // console.log(arrayItens.data)
    //const listRaca = arrayRacas.data
    //console.log(listRaca)

    const test = criarPersonagem('pietro')
    //console.log(test)
    //addRacaPersonagem(test, 'Orc')
    //console.log(test)

      expect(true).toBe(true)
    })
  }
)