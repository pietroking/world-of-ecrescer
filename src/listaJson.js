import axios from "axios"

export async function getListaQuests() {
    const listaQuests = await axios.get(('https://gustavobuttenbender.github.io/gus.github/woe/quests.json'))
    return listaQuests.data
}

export async function getListaItens() {
    const listaItens = await axios.get(('https://gustavobuttenbender.github.io/gus.github/woe/store.json'))
    return listaItens.data
}

export async function getListaRacas() {
    const listaRacas = await axios.get(('https://gustavobuttenbender.github.io/gus.github/woe/races.json'))
    return listaRacas.data
}

