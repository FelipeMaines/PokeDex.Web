import './styles.css';
import { Pokemom } from '../Models/Pokemom.js';
import { servicePokemom } from '../Services/servisePokemom';

class TelaPrincipal {

    containerConteudo: HTMLDivElement;
    formPrincipal: HTMLFormElement;
    btnLimpar: HTMLButtonElement;
    txtPesquisa: HTMLInputElement;
    servicePokemom : servicePokemom;

    constructor(){
        this.formPrincipal = document.querySelector('#formPrincipal') as HTMLFormElement;
        this.btnLimpar = document.querySelector('#btnLimpar') as HTMLButtonElement;
        this.txtPesquisa = document.querySelector('#txtPesquisa') as HTMLInputElement;
        this.containerConteudo = document.querySelector('#pnlConteudo') as HTMLDivElement;

        this.servicePokemom = new servicePokemom();
        this.RegistrarEventos();

        this.servicePokemom.secionarPokemons().then(poke => this.gerarGridPokemons(poke))
    }

    RegistrarEventos(){
        this.formPrincipal.addEventListener('submit', (e)=> this.ProcurarPokemom(e))
        this.btnLimpar.addEventListener('click', ()=> this.LimparDiv());
    }

    private gerarGridPokemons(pokemons: Pokemom[]): any {
        const pnlGrid = document.createElement('div');
        pnlGrid.classList.add('grid-pokemons');
    
        for (let pokemon of pokemons) {
          const card = this.obterCard(pokemon);
    
          pnlGrid.appendChild(card);
        }
    
        this.containerConteudo.appendChild(pnlGrid);
      }

      private obterCard(pokemon: Pokemom): HTMLDivElement {
        
        const id = document.createElement("p");
        const imagem = document.createElement("img");
        const nomePokemon = document.createElement("p");
    
        id.textContent = pokemon.id.toString();
        nomePokemon.textContent = pokemon.nome;
        imagem.src = pokemon.sprite;
    
        const cardPokemon = document.createElement('div');
        cardPokemon.classList.add('card-pokemon');
    
        cardPokemon.appendChild(id);
        cardPokemon.appendChild(imagem);
        cardPokemon.appendChild(nomePokemon);
    
        return cardPokemon;
      }

    private ProcurarPokemom(sender: Event) : void{
        sender.preventDefault();

        let nome: string = this.txtPesquisa.value;
        
        this.servicePokemom.selecionarPokemomPorNome(nome)
        .then(pokemom => this.GerarCard(pokemom))
        .catch(err => console.log('pokemon nao encontrado', err))
    }

    GerarCard(pokemom: Pokemom): void {

        // this.LimparDiv();

        // const containerCard = document.createElement('div');
        // containerCard.classList.add('card-pokemon');

        // const id = document.createElement('p');
        // const nome = document.createElement('p');
        // const sprite = document.createElement('img');

        // id.textContent = pokemom.id.toString();
        // nome.textContent = pokemom.nome;
        // sprite.src = pokemom.sprite;

        // containerCard.appendChild(id);
        // containerCard.appendChild(nome);
        // containerCard.appendChild(sprite);
        
        const containerCard = this.obterCard(pokemom);

        this.containerConteudo.appendChild(containerCard);
    }

    private LimparDiv(): void{
        this.containerConteudo.querySelector('.card-pokemon')?.remove();
    }
}

addEventListener('load', ()=> new TelaPrincipal());
