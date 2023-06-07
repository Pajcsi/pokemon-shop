import { Component } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { take, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  inputMoney: number = 0;
  warning: string = '';
  searchFormControl = new FormControl();

  constructor(
    public walletService: WalletService,
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit() {
    this.walletService.wallet$.subscribe(wallet => {
      if (wallet <= 2000) {
        this.warning = 'low money';
      } else {
        this.warning = '';
      }
    });

    this.searchFormControl.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.pokemonService.filterPokemonByName(value.toLowerCase());
    });
  }

  addMoneyToWallet() {
    this.walletService.wallet$.pipe(take(1)).subscribe(wallet => {
      if (this.inputMoney > 0) {
        const newWalletValue = wallet + this.inputMoney;
        this.walletService.updateWallet(newWalletValue);
      }
    });
  }
}