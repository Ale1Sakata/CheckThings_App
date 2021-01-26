import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../../models/film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styles: [
  ]
})
export class FilmsListComponent implements OnInit {

  films: Film[] = [];

  constructor(
    public filmService: FilmService
    ) { }

  ngOnInit() {
    this.filmService.getAll().subscribe((data: Film[]) => {
      console.log(data);
      this.films = data;
    })
  }

  public getImgPath (serverPath: string) {
    return this.filmService.getImage(serverPath);
  }

  deleteFilm(filmName, filmId) {
    const accept = confirm('Do you want to delete the film: ' + filmName + '?');
    if (accept) {
      this.filmService.delete(filmId).subscribe((data) => {
        alert('Film deleted!')
        this.ngOnInit();
      });
    }
  }

}
