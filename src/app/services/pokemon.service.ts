import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonSubject: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
  pokemonData$ = this.pokemonSubject.asObservable();

  private filteredPokemonSubject: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
  filteredPokemonData$ = this.filteredPokemonSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPokemons() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon?limit=10");
  }

  getData(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  updatePokemons(pokemon: Pokemon) {
    const currentPokemons: Pokemon[] = this.pokemonSubject.getValue();
    const updatedPokemons: Pokemon[] = [...currentPokemons, pokemon];
    this.pokemonSubject.next(updatedPokemons);
    this.filteredPokemonSubject.next(updatedPokemons);
  }

  filterPokemonByName(value: string): void {
    const pokemonData = this.pokemonSubject.getValue();
    let filteredData: any;
    
    if (value === '') {
      filteredData = pokemonData;
    } else {
      filteredData = pokemonData.filter((pokemon) => pokemon.name === value);
    }
    this.filteredPokemonSubject.next(filteredData);
  }
}
