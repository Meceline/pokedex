import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.interface';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {
  // # pour déclarer en private, flot de traitement unidirectionnel, exposer une surface réduite du composant
  readonly #pokemonService = inject(PokemonService);
 // pokemonList = signal(POKEMON_LIST);
  readonly pokemonList = signal(this.#pokemonService.getPokemonList());

  readonly searchTerm = signal('');

  readonly pokemonListFiltered = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.pokemonList();
    return pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase().includes(searchTerm.trim().toLocaleLowerCase())
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
