import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {

  characterId: string = '';
  character:any = '';
  episodes:any[] = [];
  constructor(private activatedRoute: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService) {
    this.characterId = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getCharacter();
  }

  getCharacter(event?: any) {
    this.rickAndMortyService.getCharacterById(this.characterId).subscribe({
      next: (response: any) => {
        this.character = response;
        this.getEpisodes();
      },
      error: (response: any) => {

      }
    })
  }

  getEpisodes() {
    for(let url of this.character.episode){
      this.rickAndMortyService.getByUrl(url).subscribe({
        next: (response: any) => {
          console.log(response);
          this.episodes.push(response);
        },
        error: (response: any) => {

        }
      })
    }

  }
}
