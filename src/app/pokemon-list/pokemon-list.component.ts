import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemonData: Pokemon[] = [];
  pokemonInPocket: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      response.results.forEach((pokemon: any) => {
        this.pokemonService.getData(pokemon.name).subscribe((pokemon: any) => {
          this.pokemonData.push({ name: pokemon.name, price: pokemon.weight*100, picture: pokemon.sprites.front_default });
        });
      });
    });
  }

  buyPokemon(): void {
    console.log('buying!');
    this.walletService.updateWallet(1000);
    console.log(this.walletService.wallet);
  }
}
