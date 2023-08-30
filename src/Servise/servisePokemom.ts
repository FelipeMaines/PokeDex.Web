import { Pokemom } from "../Domain/Pokemom";

export class servicePokemom {

    selecionarPokemom(nome: string): Promise<Pokemom> {
        const url: string = `https://pokeapi.co/api/v2/pokemon/${nome}`;
        
        return fetch(url)
        .then(res => res.json())
        .then((obj: any): Pokemom => this.mapearPokemom(obj));
    }

    private mapearPokemom(obj: any): Pokemom {
console.log(obj);

        return {
            id: obj.id,
            nome: obj.name,
            sprite: obj.sprites.front_default
        }
    }
}