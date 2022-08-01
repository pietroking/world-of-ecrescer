import { random } from 'mathjs'
// import { upLevel } from './personagens'

export function dano(p1, p2){
    let danoplayer
    danoplayer = (p1.dano - p2.vigor)
    if(danoplayer < 0){
        danoplayer = 0
    }
    //console.log('passou dano' + danoplayer)
    return danoplayer
}

export function batalhar(p1, p2) {
    let danop1 = dano(p1, p2)
    let danop2 = dano(p2, p1)
    let vidap1 = p1.vida
    let vidap2 = p2.vida
    let vencedor = null

    if(danop1 == 0){
        //console.log('dano p1 = 0')
        if (danop2 == 0) {
            //console.log('dano p2 = 0')
            //console.log('Empate na batalha')
            return 'EMPATE'
            //throw new Error('Empate na batalha') - erro nos testes
        }else{
            //console.log(p2.nome + ' vencedor')
            //p2 = upLevel(p2, 1) /* fazer o upLevel fora da batalha*/
            return p2
        } 
    }else{
        if (danop2 == 0) {
            //console.log(p1.nome + ' vencedor')
            //p1 = upLevel(p1, 1)
            return p1
        }else{
            const sorte = random() * 100;
            let playerAtacante = null
            if(sorte < 50){
                playerAtacante = 1
            }else{playerAtacante = 2}
            switch(playerAtacante){
                case 1:
                    while(vencedor == null){
                        vidap2-=danop1;
                        if (vidap2 <= 0) {
                            vencedor = p1
                        }
                        vidap1-=danop2;
                        if (vidap1 <= 0) {
                            vencedor = p2
                        }
                    }
                    break;
                case 2:
                    while(vencedor == null){
                        vidap1 = vidap1 - danop2;
                        if (vidap1 <= 0) {
                            vencedor = p2
                        }
                        vidap2 = vidap2 - danop1;
                        if (vidap2 <= 0) {
                            vencedor = p1
                        }
                    }
                    break;
            }
            if (vencedor == p1) {
                //console.log(p1.nome + ' vencedor')
                //p1 = upLevel(p1.nome, 1)
                return p1
            }else{//console.log(p2 + ' vencedor')
                  //p2 = upLevel(p2, 1)
                  return p2}
        }
    }
}

