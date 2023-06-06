import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { WalletService } from '../services/wallet.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemonInPocket: Pokemon[] = [];
  notFound: string = '';

  constructor(
    public pokemonService: PokemonService,
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      response.results.forEach((pokemon: any) => {
        this.pokemonService.getData(pokemon.name).subscribe((pokemon: any) => {
          this.pokemonService.updatePokemons({
            name: pokemon.name,
            price: pokemon.weight * 100,
            picture: pokemon.sprites.front_default
          });
        });
      });
    });
    this.pokemonService.filteredPokemonData$.subscribe(pokemon => {
      if (pokemon.length == 0) {
        this.notFound = 'There is no pokemon with that name!';
      } else {
        this.notFound = '';
      }
    });
  }

  buyPokemon(pokemon: Pokemon): void {
    this.walletService.wallet$.pipe(take(1)).subscribe(wallet => {
      if (wallet - pokemon.price >= 0) {
        const newWalletValue = wallet - pokemon.price;
        this.walletService.updateWallet(newWalletValue);
        this.pokemonInPocket.push(pokemon);
      }
    });
  }
}