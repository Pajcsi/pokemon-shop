import { Component } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  //wallet: number;
  inputMoney: number = 0;
  warning: string = '';

  constructor(public walletService: WalletService) {
    //this.wallet = this.walletService.wallet;
  }

  addMoneyToWallet() {
    if (this.inputMoney >= 0) {
      this.walletService.wallet += this.inputMoney;
    }
    if (this.walletService.wallet > 20000) {
      this.warning = 'Lot of money';
    }
  }
}
