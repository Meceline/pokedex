import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon } from './pokemon.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Pokedex';
  pokemonList = signal(POKEMON_LIST);

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
