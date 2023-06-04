import { Component } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  wallet: number;

  constructor(private walletService: WalletService) {
    this.wallet = this.walletService.wallet;
  }

}
