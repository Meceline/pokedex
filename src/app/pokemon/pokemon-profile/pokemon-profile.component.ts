import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-profile',
  imports: [RouterLink, DatePipe],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent {
  readonly #title = inject(Title);
  readonly #router = inject(ActivatedRoute);
  readonly #pokemonService = inject(PokemonService);

  constructor() { const p = this.pokemon(); if (p) { this.#title.setTitle(p.name); } }

  readonly pokemon = signal(this.#pokemonService.getPokemonById(Number(this.#router.snapshot.params['id'])));
  
  //readonly #pokemonId = Number(this.#router.snapshot.paramMap.get('id'));
  //readonly pokemon = signal(this.#pokemonService.getPokemonById(this.#pokemonId));


}
