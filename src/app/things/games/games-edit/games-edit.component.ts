import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../models/game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games-edit',
  templateUrl: './games-edit.component.html'
})
export class GamesEditComponent implements OnInit {
  editFormGroup: FormGroup;
  id: string;
  name: string;
  developer: string;
  genre: string;
  releaseDate: string;
  imagePath: string;

  currentGame: Game;

  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

    this.name = 'name';
    this.developer = 'developer';
    this.genre = 'genre';
    this.releaseDate = 'releaseDate';
    this.imagePath = 'imagePath';

    const idParam = 'id';

    if (this.activeRoute.snapshot.params[idParam]) {
      this.id = this.activeRoute.snapshot.params[idParam];
    }

    this.editFormGroup = formBuilder.group({
      id: [''],
      name: [''],
      developer: [''],
      genre: [''],
      releaseDate: [''],
      imagePath: ['']
    });
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    
    if (this.id !== null) {
      this.gameService.getOneById(this.id)
        .subscribe(data => (
          this.currentGame = data,
          this.editFormGroup.controls[this.name].setValue(data.name),
          this.editFormGroup.controls[this.developer].setValue(data.developer),
          this.editFormGroup.controls[this.genre].setValue(data.genre),
          this.editFormGroup.controls[this.releaseDate].setValue(datePipe.transform(data.releaseDate, 'yyyy-MM-dd')),
          this.editFormGroup.controls[this.imagePath].setValue(data.imagePath)
        ));
    }
  }

  onSave() {
    let gameToUp: Game = {
      id: this.currentGame.id,
      name: this.editFormGroup.get(this.name).value,
      developer: this.editFormGroup.get(this.developer).value,
      genre: this.editFormGroup.get(this.genre).value,
      releaseDate: this.editFormGroup.get(this.releaseDate).value,
      imagePath: this.editFormGroup.get(this.imagePath).value
    };
    this.gameService.update(gameToUp.id, gameToUp)
      .subscribe((data) => {
        alert('Game updated!')
        this.router.navigateByUrl('/gamesList')
      });
  }

}
