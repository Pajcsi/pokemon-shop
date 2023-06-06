import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private walletSubject: BehaviorSubject<number> = new BehaviorSubject<number>(15000);
  wallet$ = this.walletSubject.asObservable();

  constructor() { }

  updateWallet(value: number) {
    this.walletSubject.next(value);
  }
}
