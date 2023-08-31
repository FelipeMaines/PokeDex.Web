import { Pokemom } from "../Models/Pokemom";

export class servicePokemom {

    secionarPokemons(): Promise<Pokemom[]>{
        const url = `https://pokeapi.co/api/v2/pokemon/`;

        return fetch(url)
        .then((res: Response): Promise<any> => this.processarResposta(res))
        .then((obj: any): Promise<Pokemom[]> => this.mapearListaPokemons(obj.results))
    }

    private mapearListaPokemons(objetos: any[]): any {
        const pokemons = objetos.map(obj => this.selecionarPokemomPorNome(obj.name))

        return Promise.all(pokemons);
    }

    private processarResposta(resposta: Response): Promise<any> {
        if (resposta.ok)
          return resposta.json();
    
        throw new Error('Pokémon não encontrado!');
      }

    selecionarPokemomPorNome(nome: string): Promise<Pokemom> {
        const url: string = `https://pokeapi.co/api/v2/pokemon/${nome}`;
        
        return fetch(url)
        .then(res => res.json())
        .then((obj: any): Pokemom => this.mapearPokemom(obj));
    }

    private mapearPokemom(obj: any): Pokemom {
        return {
            id: obj.id,
            nome: obj.name,
            sprite: obj.sprites.front_default
        }
    }
}