import axios from "axios";
import {
    getRaca,
    buscarRacaLista,
    criarPersonagem,
    addRacaPersonagem,
    desequiparItem,
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

describe('testes criação personagem', () => {
    it('Deve conseguir criar um personagem de raça do tipo ALIADA com sucesso e ele deve estar no nível 10', async () => {

      const personagemEsperado = {
        nome: 'fpd',
        raca: 'Filho da noite',
        equipamentos: [],
        nivel: 10,
        dinheiro: 0,
        vida: 13,
        vigor: 5,
        dano: 4
      }

      let personagemCriado = await criarPersonagem('fpd')
      personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)

      // console.log(personagemCriado)

      // console.log(personagemEsperado)

      expect(personagemCriado).toEqual(personagemEsperado)
    })

  it('Deve conseguir criar um personagem de raça do tipo NORMAL com sucesso e ele deve estar no nível 1', async () => {
    const personagemEsperado = {
      nome: 'ORCTEST',
      raca: 'Orc',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }

    let personagemCriado = await criarPersonagem('ORCTEST')
    personagemCriado = await addRacaPersonagem(personagemCriado, 'Orc', expansoesTest, personagenstest, arrayRacas)

    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Deve receber +2 de vida e +1 de vigor ao subir dois niveis', async () => {
    const personagemEsperado = {
      nome: 'ORCTEST',
      raca: 'Orc',
      equipamentos: [],
      nivel: 3,
      dinheiro: 0,
      vida: 8,
      vigor: 5,
      dano: 4
    }


    let personagemCriado = await criarPersonagem('ORCTEST')
    personagemCriado = await addRacaPersonagem(personagemCriado, 'Orc', expansoesTest, personagenstest, arrayRacas)
    personagemCriado = upLevel(personagemCriado,2)
    
    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Personagem recém criado não deve possuir equipamentos', async () => {
    const personagemEsperado = {
      nome: 'ORCTEST',
      raca: 'Orc',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }

    let personagemCriado = await criarPersonagem('ORCTEST')
    personagemCriado = await addRacaPersonagem(personagemCriado, 'Orc', expansoesTest, personagenstest, arrayRacas)

    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado.equipamentos.length).toBe(0)
  })

  it('Personagem recém criado não deve possuir dinheiro', async () => {
    const personagemEsperado = {
      nome: 'ORCTEST',
      raca: 'Orc',
      equipamentos: [],
      nivel: 1,
      dinheiro: 0,
      vida: 6,
      vigor: 4,
      dano: 4
    }

    let personagemCriado = await criarPersonagem('ORCTEST')
    personagemCriado = await addRacaPersonagem(personagemCriado, 'Orc', expansoesTest, personagenstest, arrayRacas)

    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado.dinheiro).toBe(0)
  })

  it('Deve conseguir criar um personagem de raça do tipo ALIADA com sucesso e ele deve estar no nível 10', async () => {

    const personagemEsperado = {
      nome: 'anao ALIADA',
      raca: 'Anão Ferro Negro',
      equipamentos: [],
      nivel: 10,
      dinheiro: 0,
      vida: 12,
      vigor: 6,
      dano: 7
    }

    let personagemCriado = await criarPersonagem('anao ALIADA')
    personagemCriado = await addRacaPersonagem(personagemCriado, 'Anão Ferro Negro', expansoesTest, personagenstest, arrayRacas)

    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Deve conseguir criar um personagem de raça do tipo ALIADA com sucesso e ele deve estar no nível 10', async () => {

    const personagemEsperado = {
      nome: 'TROLL ALIADA',
      raca: 'Troll Zandalari',
      equipamentos: [],
      nivel: 10,
      dinheiro: 0,
      vida: 15,
      vigor: 9,
      dano: 3
    }

    let personagemCriado = await criarPersonagem('TROLL ALIADA')
    personagemCriado = await addRacaPersonagem(personagemCriado, 'Troll Zandalari', expansoesTest, personagenstest, arrayRacas)

    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Deve calcular o dano corretamente com o atributo base de sua raça + equipamentos', async () => {

    const personagemEsperado = {
      nome: 'fpd',
      raca: 'Filho da noite',
      equipamentos: [{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
       }/*,{
    "id": 6,
    "nome": "Talismã de vida M",
    "tipo": "VIDA",
    "preco": 90,
    "aprimoramento": 7
  }*/],
      nivel: 10,
      dinheiro: 0,
      vida: 13,
      vigor: 5,
      dano: 7
    }

    const item = {
                  "id": 1,
                  "nome": "Espada curta",
                  "tipo": "DANO",
                  "preco": 40,
                  "aprimoramento": 3
                 }
    const item2 =  {
      "id": 6,
      "nome": "Talismã de vida M",
      "tipo": "VIDA",
      "preco": 90,
      "aprimoramento": 7
    }

    let personagemCriado = await criarPersonagem('fpd')
    personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
    personagemCriado = equiparItem(personagemCriado, item)
    //personagemCriado = equiparItem(personagemCriado, item2)
    //console.log(personagemCriado)
    // personagemCriado = desequiparItem(personagemCriado, item)
    // console.log(personagemCriado)

    //console.log(personagenstest)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Deve calcular a vida corretamente com o atributo base de sua raça + equipamentos', async () => {

    const personagemEsperado = {
      nome: 'fpd',
      raca: 'Filho da noite',
      equipamentos: [/*{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
       },*/{
    "id": 6,
    "nome": "Talismã de vida M",
    "tipo": "VIDA",
    "preco": 90,
    "aprimoramento": 7
  }],
      nivel: 10,
      dinheiro: 0,
      vida: 20,
      vigor: 5,
      dano: 4
    }

    const item = {
                  "id": 1,
                  "nome": "Espada curta",
                  "tipo": "DANO",
                  "preco": 40,
                  "aprimoramento": 3
                 }
    const item2 =  {
      "id": 6,
      "nome": "Talismã de vida M",
      "tipo": "VIDA",
      "preco": 90,
      "aprimoramento": 7
    }

    let personagemCriado = await criarPersonagem('fpd')
    personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
    //personagemCriado = equiparItem(personagemCriado, item)
    personagemCriado = equiparItem(personagemCriado, item2)
    //console.log(personagemCriado)
    // personagemCriado = desequiparItem(personagemCriado, item)
    // console.log(personagemCriado)

    //console.log(personagenstest)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Deve calcular o vigor corretamente com o atributo base de sua raça + equipamentos', async () => {

    const personagemEsperado = {
      nome: 'fpd',
      raca: 'Filho da noite',
      equipamentos: [/*{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
       },{
    "id": 6,
    "nome": "Talismã de vida M",
    "tipo": "VIDA",
    "preco": 90,
    "aprimoramento": 7
  },*/{
    "id": 12,
    "nome": "Bracelete do Tinhoso",
    "tipo": "VIGOR",
    "preco": 2000,
    "aprimoramento": 90
  }],
      nivel: 10,
      dinheiro: 0,
      vida: 13,
      vigor: 95,
      dano: 4
    }

    const item = {
                  "id": 1,
                  "nome": "Espada curta",
                  "tipo": "DANO",
                  "preco": 40,
                  "aprimoramento": 3
                 }
    const item2 =  {
      "id": 6,
      "nome": "Talismã de vida M",
      "tipo": "VIDA",
      "preco": 90,
      "aprimoramento": 7
    }
    const item3 = {
      "id": 12,
      "nome": "Bracelete do Tinhoso",
      "tipo": "VIGOR",
      "preco": 2000,
      "aprimoramento": 90
    }

    let personagemCriado = await criarPersonagem('fpd')
    personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
    //personagemCriado = equiparItem(personagemCriado, item)
    //personagemCriado = equiparItem(personagemCriado, item2)
    personagemCriado = equiparItem(personagemCriado, item3)
    //console.log(personagemCriado)
    // personagemCriado = desequiparItem(personagemCriado, item)
    // console.log(personagemCriado)

    //console.log(personagenstest)

    expect(personagemCriado).toEqual(personagemEsperado)
  })
  
  it('Teste desequipar item', async () => {

    const personagemEsperado = {
      nome: 'fpd',
      raca: 'Filho da noite',
      equipamentos: [{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
       },/*{
    "id": 6,
    "nome": "Talismã de vida M",
    "tipo": "VIDA",
    "preco": 90,
    "aprimoramento": 7
  },*/{
    "id": 12,
    "nome": "Bracelete do Tinhoso",
    "tipo": "VIGOR",
    "preco": 2000,
    "aprimoramento": 90
  }],
      nivel: 10,
      dinheiro: 0,
      vida: 13,
      vigor: 95,
      dano: 7
    }

    const item = {
                  "id": 1,
                  "nome": "Espada curta",
                  "tipo": "DANO",
                  "preco": 40,
                  "aprimoramento": 3
                 }
    const item2 =  {
      "id": 6,
      "nome": "Talismã de vida M",
      "tipo": "VIDA",
      "preco": 90,
      "aprimoramento": 7
    }
    const item3 = {
      "id": 12,
      "nome": "Bracelete do Tinhoso",
      "tipo": "VIGOR",
      "preco": 2000,
      "aprimoramento": 90
    }

    let personagemCriado = await criarPersonagem('fpd')
    personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
    personagemCriado = equiparItem(personagemCriado, item)
    personagemCriado = equiparItem(personagemCriado, item2)
    personagemCriado = equiparItem(personagemCriado, item3)
    //console.log(personagemCriado)
     personagemCriado = desequiparItem(personagemCriado, item2)
    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Teste desequipar item1', async () => {

    const personagemEsperado = {
      nome: 'fpd',
      raca: 'Filho da noite',
      equipamentos: [/*{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
       },*/{
    "id": 6,
    "nome": "Talismã de vida M",
    "tipo": "VIDA",
    "preco": 90,
    "aprimoramento": 7
  },{
    "id": 12,
    "nome": "Bracelete do Tinhoso",
    "tipo": "VIGOR",
    "preco": 2000,
    "aprimoramento": 90
  }],
      nivel: 10,
      dinheiro: 0,
      vida: 20,
      vigor: 95,
      dano: 4
    }

    const item = {
                  "id": 1,
                  "nome": "Espada curta",
                  "tipo": "DANO",
                  "preco": 40,
                  "aprimoramento": 3
                 }
    const item2 =  {
      "id": 6,
      "nome": "Talismã de vida M",
      "tipo": "VIDA",
      "preco": 90,
      "aprimoramento": 7
    }
    const item3 = {
      "id": 12,
      "nome": "Bracelete do Tinhoso",
      "tipo": "VIGOR",
      "preco": 2000,
      "aprimoramento": 90
    }

    let personagemCriado = await criarPersonagem('fpd')
    personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
    personagemCriado = equiparItem(personagemCriado, item)
    personagemCriado = equiparItem(personagemCriado, item2)
    personagemCriado = equiparItem(personagemCriado, item3)
    //console.log(personagemCriado)
     personagemCriado = desequiparItem(personagemCriado, item)
    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Teste desequipar item2', async () => {

    const personagemEsperado = {
      nome: 'fpd',
      raca: 'Filho da noite',
      equipamentos: [/*{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
       },*/{
    "id": 6,
    "nome": "Talismã de vida M",
    "tipo": "VIDA",
    "preco": 90,
    "aprimoramento": 7
  }/*,{
    "id": 12,
    "nome": "Bracelete do Tinhoso",
    "tipo": "VIGOR",
    "preco": 2000,
    "aprimoramento": 90
  }*/],
      nivel: 10,
      dinheiro: 0,
      vida: 20,
      vigor: 5,
      dano: 4
    }

    const item = {
                  "id": 1,
                  "nome": "Espada curta",
                  "tipo": "DANO",
                  "preco": 40,
                  "aprimoramento": 3
                 }
    const item2 =  {
      "id": 6,
      "nome": "Talismã de vida M",
      "tipo": "VIDA",
      "preco": 90,
      "aprimoramento": 7
    }
    const item3 = {
      "id": 12,
      "nome": "Bracelete do Tinhoso",
      "tipo": "VIGOR",
      "preco": 2000,
      "aprimoramento": 90
    }

    let personagemCriado = await criarPersonagem('fpd')
    personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
    personagemCriado = equiparItem(personagemCriado, item)
    personagemCriado = equiparItem(personagemCriado, item2)
    personagemCriado = equiparItem(personagemCriado, item3)
    //console.log(personagemCriado)
    personagemCriado = desequiparItem(personagemCriado, item)
    personagemCriado = desequiparItem(personagemCriado, item3)
    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Deve calcular a vida corretamente com o atributo base de sua raça + equipamentos', async () => {

    const personagemEsperado = {
      nome: 'fpd',
      raca: 'Filho da noite',
      equipamentos: [/*{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
       },*/{
      "id": 7,
      "nome": "Talismã de Chessus",
      "tipo": "VIDA",
      "preco": 2000,
      "aprimoramento": 90
    }],
      nivel: 10,
      dinheiro: 0,
      vida: 103,
      vigor: 5,
      dano: 4
    }

    const item = {
      "id": 7,
      "nome": "Talismã de Chessus",
      "tipo": "VIDA",
      "preco": 2000,
      "aprimoramento": 90
    }
    const item2 =  {
      "id": 6,
      "nome": "Talismã de vida M",
      "tipo": "VIDA",
      "preco": 90,
      "aprimoramento": 7
    }

    let personagemCriado = await criarPersonagem('fpd')
    personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
    //personagemCriado = equiparItem(personagemCriado, item)
    personagemCriado = equiparItem(personagemCriado, item2)
    // console.log(personagemCriado)
    // personagemCriado = desequiparItem(personagemCriado, item)
    // console.log(personagemCriado)
    personagemCriado = equiparItem(personagemCriado, item)
    // console.log(personagemCriado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Teste desequipar item4', async () => {

    const personagemEsperado = {
      nome: 'fpd',
      raca: 'Filho da noite',
      equipamentos: [/*{
        "id": 1,
        "nome": "Espada curta",
        "tipo": "DANO",
        "preco": 40,
        "aprimoramento": 3
       },{
    "id": 6,
    "nome": "Talismã de vida M",
    "tipo": "VIDA",
    "preco": 90,
    "aprimoramento": 7
  },{
    "id": 12,
    "nome": "Bracelete do Tinhoso",
    "tipo": "VIGOR",
    "preco": 2000,
    "aprimoramento": 90
  }*/],
      nivel: 10,
      dinheiro: 0,
      vida: 13,
      vigor: 5,
      dano: 4
    }

    const item = {
                  "id": 1,
                  "nome": "Espada curta",
                  "tipo": "DANO",
                  "preco": 40,
                  "aprimoramento": 3
                 }
    const item2 =  {
      "id": 6,
      "nome": "Talismã de vida M",
      "tipo": "VIDA",
      "preco": 90,
      "aprimoramento": 7
    }
    const item3 = {
      "id": 12,
      "nome": "Bracelete do Tinhoso",
      "tipo": "VIGOR",
      "preco": 2000,
      "aprimoramento": 90
    }

    let personagemCriado = await criarPersonagem('fpd')
    personagemCriado = await addRacaPersonagem(personagemCriado, 7, expansoesTest, personagenstest, arrayRacas)
    personagemCriado = equiparItem(personagemCriado, item)
    personagemCriado = equiparItem(personagemCriado, item2)
    personagemCriado = equiparItem(personagemCriado, item3)
    personagemCriado = equiparItem(personagemCriado, item)
    personagemCriado = equiparItem(personagemCriado, item2)
    personagemCriado = equiparItem(personagemCriado, item3)
    //console.log(personagemCriado)
    personagemCriado = desequiparItem(personagemCriado, item)
    personagemCriado = desequiparItem(personagemCriado, item2)
    personagemCriado = desequiparItem(personagemCriado, item3)
    // console.log(personagemCriado)

    // console.log(personagemEsperado)

    expect(personagemCriado).toEqual(personagemEsperado)
  })


})