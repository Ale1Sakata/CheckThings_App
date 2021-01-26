import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html'
})
export class GamesListComponent implements OnInit {

  games: Game[] = [];

  constructor(
    public gameService: GameService
    ) { }

  ngOnInit() {
    this.gameService.getAll().subscribe((data: Game[]) => {
      console.log(data);
      this.games = data;
    })
  }

  public getImgPath (serverPath: string) {
    return this.gameService.getImage(serverPath);
  }

  deleteGame(gameName, gameId) {
    const accept = confirm('Do you want to delete the game: ' + gameName + '?');
    if (accept) {
      this.gameService.delete(gameId).subscribe((data) => {
        alert('Game deleted!')
        this.ngOnInit();
      });
    }
  }

}
