import { Component } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  inputMoney: string = '';
  warning: string = '';

  constructor(public walletService: WalletService) { }

  ngOnInit() {
    this.walletService.wallet$.subscribe(wallet => {
      if (wallet <= 2000) {
        this.warning = 'low money';
      } else {
        this.warning = '';
      }
    });
  }

  addMoneyToWallet() {
    this.walletService.wallet$.pipe(take(1)).subscribe(wallet => {
      if (Number(this.inputMoney) > 0 && !this.inputMoney.startsWith("0")) {
        const newWalletValue = wallet + Number(this.inputMoney);
        this.walletService.updateWallet(newWalletValue);
      }
    });
  }
}
