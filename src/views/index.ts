import './styles.css';
import { Pokemom } from '../Domain/Pokemom.js';
import { servicePokemom } from '../Servise/servisePokemom';

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
    }

    RegistrarEventos(){
        this.formPrincipal.addEventListener('submit', (e)=> this.ProcurarPokemom(e))
        this.btnLimpar.addEventListener('click', ()=> this.LimparDiv());
    }

    private ProcurarPokemom(sender: Event) : void{
        sender.preventDefault();

        let nome: string = this.txtPesquisa.value;
        
        this.servicePokemom.selecionarPokemom(nome)
        .then(pokemom => this.GerarCard(pokemom))
        .catch(err => console.log('pokemon nao encontrado', err))
    }

    GerarCard(pokemom: Pokemom): void {

        this.LimparDiv();

        const containerCard = document.createElement('div');
        containerCard.classList.add('card-pokemon');

        const id = document.createElement('p');
        const nome = document.createElement('p');
        const sprite = document.createElement('img');

        id.textContent = pokemom.id.toString();
        nome.textContent = pokemom.nome;
        sprite.src = pokemom.sprite;

        containerCard.appendChild(id);
        containerCard.appendChild(nome);
        containerCard.appendChild(sprite);

        this.containerConteudo.appendChild(containerCard);
    }

    private LimparDiv(): void{
        this.containerConteudo.querySelector('.card-pokemon')?.remove();
    }
}

addEventListener('load', ()=> new TelaPrincipal());
