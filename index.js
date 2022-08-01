import { useQuestion } from './src/services/question/use-question'
import { useLocalStorage } from './src/services/local-storage/use-local-storage'
import { main,menuStore } from './menu'
import { getListaRacas, getListaItens, getListaQuests} from './src/listaJson';


// async function teste(){
//     const listaItens = await getListaItens();  
//     const personagenstest = [{nome: 'PIETRO',
//                         raca: 'Humano',
//                         equipamentos: [listaItens[1]],
//                         nivel: 100,
//                         dinheiro: 100000000,
//                         vida: 100,
//                         vigor: 100,
//                         dano: 107}]
  
  
//     await menuStore(0,personagenstest, listaItens, [1])
//     console.log(personagenstest)
//   }
  
// teste()

main()