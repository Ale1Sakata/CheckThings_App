import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../models/film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-films-edit',
  templateUrl: './films-edit.component.html',
  styles: [
  ]
})
export class FilmsEditComponent implements OnInit {

  editFormGroup: FormGroup;
  id: string;
  name: string;
  producer: string;
  director: string;
  genre: string;
  releaseDate: string;
  imagePath: string;

  currentFilm: Film;

  constructor(
    private filmService: FilmService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

    this.name = 'name';
    this.producer = 'producer';
    this.director = 'director';
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
      producer: [''],
      director: [''],
      genre: [''],
      releaseDate: [''],
      imagePath: ['']
    });
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    
    if (this.id !== null) {
      this.filmService.getOneById(this.id)
        .subscribe(data => (
          this.currentFilm = data,
          this.editFormGroup.controls[this.name].setValue(data.name),
          this.editFormGroup.controls[this.producer].setValue(data.producer),
          this.editFormGroup.controls[this.director].setValue(data.director),
          this.editFormGroup.controls[this.genre].setValue(data.genre),
          this.editFormGroup.controls[this.releaseDate].setValue(datePipe.transform(data.releaseDate, 'yyyy-MM-dd')),
          this.editFormGroup.controls[this.imagePath].setValue(data.imagePath)
        ));
    }
  }

  onSave() {
    let filmToUp: Film = {
      id: this.currentFilm.id,
      name: this.editFormGroup.get(this.name).value,
      producer: this.editFormGroup.get(this.producer).value,
      director: this.editFormGroup.get(this.director).value,
      genre: this.editFormGroup.get(this.genre).value,
      releaseDate: this.editFormGroup.get(this.releaseDate).value,
      imagePath: this.editFormGroup.get(this.imagePath).value
    };
    this.filmService.update(filmToUp.id, filmToUp)
      .subscribe((data) => {
        alert('Film updated!')
        this.router.navigateByUrl('/filmsList')
      });
  }

}
