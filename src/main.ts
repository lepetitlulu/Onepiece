import './style.css'
import type { CharacterInfo} from './class'
import { Character } from './class'

//récuperer l'api des perso
//afficher les perso grace a l'api
//mettre les perso dans des cards

async function LoadCharacter(): Promise<void> {
    const api: CharacterInfo[] = await (async () => {
        const response = await fetch("https://api.api-onepiece.com/v2/characters/en", { method: "GET"})
        const personnages = await response.json()
        return personnages
    })()


    api.forEach((personnage) => {
        const perso = new Character(personnage)

        const container: HTMLElement = document.getElementById("container")!

        const card = document.createElement('div')
        card.classList.add("border-2","border-black","bg-red-500")

        const name = document.createElement('h1')
        name.classList.add("text-black","font-bold")
        name.textContent = perso.name
        card.appendChild(name)

        const job = document.createElement('h2')
        job.classList.add("text-white", "font-bold")
        job.textContent = perso.job
        card.appendChild(job)

        const bounty = document.createElement('h3')
        bounty.classList.add("text-black", "font-bold")
        bounty.textContent = perso.bounty
        card.appendChild(bounty)



        container.appendChild(card)
    })
}

LoadCharacter()