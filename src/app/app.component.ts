import { Component, computed, inject, signal } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon } from './pokemon.interface';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  // # pour déclarer en private, flot de traitement unidirectionnel, exposer une surface réduite du composant
  readonly #pokemonService = inject(PokemonService);
 
  title = 'Pokedex';
  // pokemonList = signal(POKEMON_LIST);
  readonly pokemonList = signal(this.#pokemonService.getPokemonList());

  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.pokemonList();
    return pokemonList.filter(
      pokemon => pokemon.name.toLowerCase().includes(searchTerm.trim().toLocaleLowerCase())
    );
  })


  size(pokemon: Pokemon){
    if (pokemon.life < 15) return 'Petit';
    if (pokemon.life < 25) return 'Moyen';
    return 'Grand';
  };

  incrementLife(pokemon: Pokemon){
    pokemon.life = pokemon.life + 1;
  }
  decrementLife(pokemon: Pokemon){
    pokemon.life = pokemon.life - 1;
  }
}
