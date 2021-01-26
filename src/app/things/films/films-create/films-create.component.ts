import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-films-create',
  templateUrl: './films-create.component.html',
  styles: [
  ]
})
export class FilmsCreateComponent implements OnInit {

  filmForm: FormGroup;

  public message: string;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public filmService: FilmService
  ) { }

  ngOnInit() {
    this.filmForm = this.formBuilder.group({
      name: [''],
      producer: [''],
      director: [''],
      genre: [''],
      releaseDate: [''],
      imagePath: ['']
    })
  }

  submitFilm(){
    this.filmService.create(this.filmForm.value).subscribe(data => {
      alert('Film created!')
      this.router.navigateByUrl('/filmsList')
    })
  }

  uploadFile = (files) => {
    if(files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.filmService.uploadImage(formData).subscribe(event => {
      if  (event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if(event.type === HttpEventType.Response){
        this.message = 'Upload success!';
        this.filmForm.controls['imagePath'].setValue(event.body.dbPath);
      }
    });
  }

}
