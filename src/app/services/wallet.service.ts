import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  wallet: number = 15000;

  constructor() { }

  updateWallet(price: number): void {
    this.wallet -= price;
  }
}
