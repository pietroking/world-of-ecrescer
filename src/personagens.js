export function addArrayPersonagens(personagem, listaPersonagem){
  listaPersonagem.push(personagem)
  return listaPersonagem
}


export async function buscarRacaLista(nomeraca, listaRacas) {
  let auxRaca = listaRacas.find(r => r.raca == nomeraca || r.id == nomeraca)
  return auxRaca
}


export async function criarPersonagem(nome){
  const personagem = {'nome':nome}
  //console.log(personagem)
  return personagem
}


export async function addRacaPersonagem(personagemNovo, nomeraca, listaExpansoes, listaPersonagem, listaRacas){
  let verifica = true
  const auxRaca = await buscarRacaLista(nomeraca, listaRacas)
  if(auxRaca.tipo === 'NORMAL'){
    personagemNovo = {...personagemNovo, 
                  'raca':auxRaca.raca, 
                  'equipamentos':[], 
                  'nivel':1, 
                  'dinheiro':0, 
                  'vida':auxRaca.vidaBase, 
                  'vigor':auxRaca.vigorBase, 
                  'dano':auxRaca.danoBase}
  }else{
    let auxlv = null
    auxlv = listaPersonagem.find(p => p.level >= auxRaca.lvlMinimoParaObter)
    if(auxlv === null){
      console.log('Voce nao possui o lv minimo para criar esse personagem')
      verifica = false
    }else{
      if (!listaExpansoes.includes(auxRaca.idExpansao)) {
      }else{
          personagemNovo = {...personagemNovo, 
                            'raca':auxRaca.raca, 
                            'equipamentos':[], 
                            'nivel':1, 
                            'dinheiro':0, 
                            'vida':auxRaca.vidaBase, 
                            'vigor':auxRaca.vigorBase, 
                            'dano':auxRaca.danoBase}
          }
          personagemNovo = upLevel(personagemNovo,9)
    }
  }
  if(verifica == false) {return null}
  addArrayPersonagens(personagemNovo, listaPersonagem)
  return personagemNovo
}


export function desequiparItem(personagem, item){
  let auxItem = null
    for(let index = 0; index < personagem.equipamentos.length; index++){
      if(item.tipo === personagem.equipamentos[index].tipo){
        auxItem = index
      }}
      switch(item.tipo){
        case 'DANO':
          personagem.dano = (personagem.dano - personagem.equipamentos[auxItem].aprimoramento)
          break;
        case 'VIDA':
          personagem.vida = (personagem.vida - personagem.equipamentos[auxItem].aprimoramento)
          break;
        case 'VIGOR':
          personagem.vigor = (personagem.vigor - personagem.equipamentos[auxItem].aprimoramento)
          break;
      }
    personagem.equipamentos.splice(auxItem,1)
  return personagem
}


export function equiparItem(personagem, item){
  let auxItem = null
  let tam = personagem.equipamentos.length
    if (tam == 0) {
      personagem.equipamentos.push(item)
      switch(item.tipo){
        case 'DANO':
          personagem.dano = (personagem.dano + item.aprimoramento)
          break;
        case 'VIDA':
          personagem.vida = (personagem.vida + item.aprimoramento)
          break;
        case 'VIGOR':
          personagem.vigor = (personagem.vigor + item.aprimoramento)
          break;
      }
    }else{
      for(let index = 0; index < personagem.equipamentos.length; index++){
        if(item.tipo === personagem.equipamentos[index].tipo){
          auxItem = index
        }}
        if(auxItem !== null){
          switch(item.tipo){
              case 'DANO':
                personagem.dano = (personagem.dano - personagem.equipamentos[auxItem].aprimoramento)
                break;
              case 'VIDA':
                personagem.vida = (personagem.vida - personagem.equipamentos[auxItem].aprimoramento)
                break;
              case 'VIGOR':
                personagem.vigor = (personagem.vigor - personagem.equipamentos[auxItem].aprimoramento)
                break;
          }
          personagem.equipamentos.splice(auxItem, 1)
        }
        personagem.equipamentos.push(item)
        switch(item.tipo){
          case 'DANO':
            personagem.dano = (personagem.dano + item.aprimoramento)
            break;
          case 'VIDA':
            personagem.vida = (personagem.vida + item.aprimoramento)
            break;
          case 'VIGOR':
            personagem.vigor = (personagem.vigor + item.aprimoramento)
            break;
        }
  }
  return personagem
}


export function upLevel(personagem, aumentoLv){
    for(let i = aumentoLv; i!==0; i--){
      const nivelAtual = personagem.nivel + 1
      if(nivelAtual % 2 == 1){
        personagem = {...personagem,
                      vida: personagem.vida + 2,
                      vigor: personagem.vigor + 1,
                      nivel: nivelAtual
        }
      }else{
        personagem = {...personagem,
                      nivel: nivelAtual}
      }
    }
  return personagem
}


