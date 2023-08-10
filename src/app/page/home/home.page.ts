
import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {

  characters: any[] = [];
  params = {} as any
  constructor(private rickAndMortyService: RickAndMortyService ) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  //Obtener Personajes
  getCharacters(event?: any) {
    this.params.page++;
    this.rickAndMortyService.getCharacters(this.params).subscribe({
      next: (response: any) => {
        this.characters.push(...response.results);
        console.log(this.characters);
        if (event) {
          event.target.complete();
        }
      },
      error: (response: any) => {
        if (event) {
          event.target.complete();
        }
      }
    })
  }
  //Buscar Personaje por nombre
  searchCharacters() {
    this.params.page = 1;
    this.rickAndMortyService.getCharacters(this.params).subscribe({
      next: (response: any) => {
        this.characters = response.results;
        console.log(this.characters);

      },
      error: (response: any) => {

      }
    })
  }
}
