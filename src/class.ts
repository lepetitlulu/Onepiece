export type CharacterInfo = {
    id: number
    name: string
    job: string
    size: string
    birthday: string
    age: string
    bounty: string
    status: string
    description: string
    crew: {
        id: number
        name: string
        description: string
        status: string
        number: string
        roman_name: string
        total_prime: string
        is_yonko: string
    },
    fruit: {
        id: number
        name: string
        description: string
        type: string
        filename: string
        roman_name: string
        technicalFile: string
    }
}

export class Character {
    id: number
    name: string
    job: string
    size: string
    birthday: string
    age: string
    bounty: string
    status: string
    description: string
    crew: {
        id: number
        name: string
        description: string
        status: string
        number: string
        roman_name: string
        total_prime: string
        is_yonko: string
    }
    fruit: {
        id: number
        name: string
        description: string
        type: string
        filename: string
        roman_name: string
        technicalFile: string
    }

    constructor(data: CharacterInfo) {
        this.id = data.id
        this.name = data.name
        this.job = data.job
        this.size = data.size
        this.birthday = data.birthday
        this.age = data.age
        this.bounty = data.bounty
        this.status = data.status
        this.description = data.description
        this.crew = data.crew
        this.fruit = data.fruit
    }
}