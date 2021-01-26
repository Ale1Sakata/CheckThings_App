import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games-create',
  templateUrl: './games-create.component.html'
})
export class GamesCreateComponent implements OnInit {
  gameForm: FormGroup;

  public message: string;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public gameService: GameService
  ) { }

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      name: [''],
      developer: [''],
      genre: [''],
      releaseDate: [''],
      imagePath: ['']
    })
  }

  submitGame(){
    this.gameService.create(this.gameForm.value).subscribe(data => {
      alert('Game created!')
      this.router.navigateByUrl('/gamesList')
    })
  }

  uploadFile = (files) => {
    if(files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.gameService.uploadImage(formData).subscribe(event => {
      if  (event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if(event.type === HttpEventType.Response){
        this.message = 'Upload success!';
        this.gameForm.controls['imagePath'].setValue(event.body.dbPath);
      }
    });
  }

}
