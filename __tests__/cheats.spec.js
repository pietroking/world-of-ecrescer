import axios from "axios";
import { recebeCheats } from '../src/cheats'
import {
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
                     dano: 100},
                     {nome: 'ORCTEST',
                     raca: 'Orc',
                     equipamentos: [],
                     nivel: 1,
                     dinheiro: 0,
                     vida: 6,
                     vigor: 4,
                     dano: 4},
                     {nome: 'anao ALIADA',
                     raca: 'Anão Ferro Negro',
                     equipamentos: [],
                     nivel: 10,
                     dinheiro: 0,
                     vida: 12,
                     vigor: 6,
                     dano: 7}]
})

describe('testes cheats', () => {
    it('Deve conseguir aplicar o cheat WILLIDAN e subir +20 níveis do personagem selecionado', async () => {
      let personagemSelecionado = personagenstest[1]

      const p1 = {nome: 'ORCTEST',
      raca: 'Orc',
      equipamentos: [],
      nivel: 21,
      dinheiro: 0,
      vida: 26,
      vigor: 14,
      dano: 4}

      personagemSelecionado = recebeCheats('WILLIDAN', personagemSelecionado, personagenstest)
      // console.log(personagemCriado)
      // console.log(p1)

      expect(p1).toEqual(personagemSelecionado)
    })

    it('Deve conseguir aplicar o cheat GUSTHRALL e dar +2000 de dinheiro para o personagem selecionado', async () => {
      let personagemSelecionado = personagenstest[1]
        // let personagemSelecionado = {nome: 'ORCTEST',
        // raca: 'Orc',
        // equipamentos: [],
        // nivel: 1,
        // dinheiro: 0,
        // vida: 6,
        // vigor: 4,
        // dano: 4}
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 21,
        dinheiro: 2000,
        vida: 26,
        vigor: 14,
        dano: 4}
  
        personagemSelecionado = recebeCheats('GUSTHRALL', personagemSelecionado, personagenstest)
        // console.log(personagemSelecionado)
        // console.log(p1)
  
        expect(p1).toEqual(personagemSelecionado)
      })

      it('Deve conseguir aplicar o cheat ANDUINNUNES e dar +20000 de dinheiro para todos os personagens', async () => {
        let personagemSelecionado = personagenstest[1]

        const valores = [20000, 20000, 20000]
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 20000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        personagemSelecionado = recebeCheats('ANDUINNUNES', personagemSelecionado, personagenstest)
        //console.log(personagenstest)
        let valoresfinais = personagenstest.map(p => p.dinheiro)
        // console.log(p1)
  
        expect(valores).toEqual(valoresfinais)
      })

      it('Deve conseguir aplicar o cheat JULICHKING e subir +5 níveis de todos os personagens', async () => {
        let personagemSelecionado = personagenstest[1]

        const valores = [105, 6, 15]
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 22000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        personagemSelecionado = recebeCheats('JULICHKING', personagemSelecionado, personagenstest)
        //console.log(personagenstest)
        let valoresfinais = personagenstest.map(p => p.nivel)
        // console.log(p1)
  
        expect(valores).toEqual(valoresfinais)
      })

      it('Deve conseguir aplicar o cheat KEVINERZUL e receber o item Arco do callback infinito', async () => {
        let personagemSelecionado = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [{
            nome: 'Arco do Callback Infinito',
            tipo: 'DANO',
            aprimoramento: 2000,
        }],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 4,
        dano: 2004}
  
        personagemSelecionado = recebeCheats('KEVINERZUL', personagemSelecionado, personagenstest)
        // console.log(personagemSelecionado)
        // console.log(p1)
  
        expect(p1).toEqual(personagemSelecionado)
      })

      it('Deve conseguir aplicar o cheat FABYOGGSARON e receber o item Talismã do Polimorfismo', async () => {
        let personagemSelecionado = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [{
            nome: 'Talismã do Polimorfismo',
            tipo: 'VIDA',
            aprimoramento: 2000,
        }],
        nivel: 1,
        dinheiro: 2000,
        vida: 2006,
        vigor: 4,
        dano: 4}
  
        personagemSelecionado = recebeCheats('FABYOGGSARON', personagemSelecionado, personagenstest)
        // console.log(personagemSelecionado)
        // console.log(p1)
  
        expect(p1).toEqual(personagemSelecionado)
      })

      it('Deve conseguir aplicar o cheat PABLOTHAR e receber o item Talismã do Polimorfismo', async () => {
        let personagemSelecionado = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [{
            nome: 'Talismã do Polimorfismo',
            tipo: 'VIDA',
            aprimoramento: 2000,
        }],
        nivel: 1,
        dinheiro: 2000,
        vida: 2006,
        vigor: 4,
        dano: 4}
  
        personagemSelecionado = recebeCheats('PABLOTHAR', personagemSelecionado, personagenstest)
        // console.log(personagemSelecionado)
        // console.log(p1)
  
        expect(p1).toEqual(personagemSelecionado)
      })

      it('Deve conseguir aplicar o cheat VITOREXXAR e receber o item Talismã do Polimorfismo', async () => {
        let personagemSelecionado = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [{
            nome: 'Talismã do Polimorfismo',
            tipo: 'VIDA',
            aprimoramento: 2000,
        }],
        nivel: 1,
        dinheiro: 2000,
        vida: 2006,
        vigor: 4,
        dano: 4}
  
        personagemSelecionado = recebeCheats('VITOREXXAR', personagemSelecionado, personagenstest)
        // console.log(personagemSelecionado)
        // console.log(p1)
  
        expect(p1).toEqual(personagemSelecionado)
      })

      it('Deve conseguir aplicar o cheat ZORZARTHAS e receber o item Talismã Indexado', async () => {
        let personagemSelecionado = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [{
                nome: 'Talismã Indexado',
                tipo: 'VIDA',
                aprimoramento: 2000,
            }],
        nivel: 1,
        dinheiro: 2000,
        vida: 2006,
        vigor: 4,
        dano: 4}
  
        personagemSelecionado = recebeCheats('ZORZARTHAS', personagemSelecionado, personagenstest)
        // console.log(personagemSelecionado)
        // console.log(p1)
  
        expect(p1).toEqual(personagemSelecionado)
      })

      it('Deve conseguir aplicar o cheat DIANDRAKA e receber o item Talismã Indexado', async () => {
        let personagemSelecionado = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [{
                nome: 'Talismã Indexado',
                tipo: 'VIDA',
                aprimoramento: 2000,
            }],
        nivel: 1,
        dinheiro: 2000,
        vida: 2006,
        vigor: 4,
        dano: 4}
  
        personagemSelecionado = recebeCheats('DIANDRAKA', personagemSelecionado, personagenstest)
        // console.log(personagemSelecionado)
        // console.log(p1)
  
        expect(p1).toEqual(personagemSelecionado)
      })

      it('Deve conseguir aplicar o cheat SERGIORGRIM e receber o item Armadura de Flexbox', async () => {
        let listaPersonagemtesteID = []
        let personagemSelecionado = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [{
                nome: 'Armadura de Flexbox',
                tipo: 'VIGOR',
                aprimoramento: 2000,
            }],
        nivel: 1,
        dinheiro: 2000,
        vida: 6,
        vigor: 2004,
        dano: 4}
        listaPersonagemtesteID.push(personagemSelecionado)
  
        personagemSelecionado = recebeCheats('SERGIORGRIM', personagemSelecionado, listaPersonagemtesteID)
        // console.log(personagemSelecionado)
        // console.log(p1)
  
        expect(p1).toEqual(personagemSelecionado)
      })

      it('false', async () => {
        let personagemSelecionado = personagenstest[1]

        const valores = false
  
        const p1 = {nome: 'ORCTEST',
        raca: 'Orc',
        equipamentos: [],
        nivel: 1,
        dinheiro: 22000,
        vida: 6,
        vigor: 4,
        dano: 4}
  
        personagemSelecionado = recebeCheats('qualqueroutracoisa', personagemSelecionado, personagenstest)
        //console.log(personagenstest)
        // console.log(p1)
  
        expect(valores).toEqual(personagemSelecionado)
      })

})