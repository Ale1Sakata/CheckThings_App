import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styles: [
  ]
})
export class BooksCreateComponent implements OnInit {
  bookForm: FormGroup;

  public message: string;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public bookService: BookService
  ) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      name: [''],
      author: [''],
      genre: [''],
      releaseDate: [''],
      imagePath: ['']
    })
  }

  submitBook() {
    this.bookService.create(this.bookForm.value).subscribe(data => {
      alert('Book created!')
      this.router.navigateByUrl('/booksList')
    })
  }

  uploadFile = (files) => {
    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.bookService.uploadImage(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success!';
        this.bookForm.controls['imagePath'].setValue(event.body.dbPath);
      }
    });
  }

}
