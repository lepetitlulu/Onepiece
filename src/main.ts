import './style.css'
import type { CharacterInfo} from './class'
import { Character } from './class'

 const header = document.createElement('header')

function Header() {
    header.classList.add("border-2","border-black")
    document.body.prepend(header)
}
Header()

function navPage() {
    const accueil = document.createElement('a')
    accueil.href = "index.html"
    accueil.classList.add("")
    accueil.textContent = "Accueil"
    header.appendChild(accueil)
    
    const personnages = document.createElement('a')
    personnages.href = "personnage.html"
    personnages.textContent = "Liste personnages"
    header.appendChild(personnages)
}

navPage()

async function LoadCharacter(): Promise<void> {
    const api: CharacterInfo[] = await (async () => {
        const response = await fetch("https://api.api-onepiece.com/v2/characters/fr", { method: "GET"})
        const personnages = await response.json()
        return personnages
    })()


    api.forEach((personnage) => {
        const perso = new Character(personnage)

        const container: HTMLElement = document.getElementById("container")!

        const card = document.createElement('div')
        card.classList.add("border-2","border-black","rounded-3xl","items-center","text-center","flex","flex-col","w-90")

        const name = document.createElement('h1')
        name.classList.add("text-black","font-bold")
        name.textContent = perso.name
        card.appendChild(name)

        const job = document.createElement('h2')
        job.classList.add("text-black", "font-bold")
        job.textContent = perso.job || "Inconnu"
        card.appendChild(job)

        const bounty = document.createElement('h3')
        bounty.classList.add("text-black", "font-bold")
        bounty.textContent = perso.bounty || "Inconnu ou pas de Prime"
        card.appendChild(bounty)

        const age = document.createElement('p')
        age.classList.add("text-black")
        age.textContent = perso.age
        card.appendChild(age)

        const size = document.createElement('p')
        size.classList.add("text-black")
        size.textContent = perso.size
        card.appendChild(size)

        const description = document.createElement('h3')
        description.classList.add("text-black","font-bold")
        description.textContent = perso.description
        card.appendChild(description)

        const status = document.createElement('p')
        status.classList.add("text-black")
        status.textContent = perso.status || "Inconnu"
        card.appendChild(status)

    if (perso.crew) {
        const crew = document.createElement('h1')
        crew.classList.add("text-black","font-bold")
        crew.textContent = `${perso.crew.name} Yonko: ${perso.crew.is_yonko ? "Oui" : "Non"} Nombre membre: ${perso.crew.number} `
        card.appendChild(crew)
    }

        container.appendChild(card)
    })
}

LoadCharacter()