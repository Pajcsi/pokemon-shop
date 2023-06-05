import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  //wallet: number = 15000;

  private walletSubject: BehaviorSubject<number> = new BehaviorSubject<number>(15000);
  wallet$ = this.walletSubject.asObservable();

  constructor() { }

  updateWallet(value: number) {
    this.walletSubject.next(value);
  }

  // updateWallet(price: number): void {
  //   this.wallet -= price;
  // }

  
}
