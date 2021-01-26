import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-edit',
  templateUrl: './books-edit.component.html',
  styles: [
  ]
})
export class BooksEditComponent implements OnInit {
  editFormGroup: FormGroup;
  id: string;
  name: string;
  author: string;
  genre: string;
  releaseDate: string;
  imagePath: string;

  currentBook: Book;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

    this.name = 'name';
    this.author = 'author';
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
      author: [''],
      genre: [''],
      releaseDate: [''],
      imagePath: ['']
    });
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    
    if (this.id !== null) {
      this.bookService.getOneById(this.id)
        .subscribe(data => (
          this.currentBook = data,
          this.editFormGroup.controls[this.name].setValue(data.name),
          this.editFormGroup.controls[this.author].setValue(data.author),
          this.editFormGroup.controls[this.genre].setValue(data.genre),
          this.editFormGroup.controls[this.releaseDate].setValue(datePipe.transform(data.releaseDate, 'yyyy-MM-dd')),
          this.editFormGroup.controls[this.imagePath].setValue(data.imagePath)
        ));
    }
  }

  onSave() {
    let bookToUp: Book = {
      id: this.currentBook.id,
      name: this.editFormGroup.get(this.name).value,
      author: this.editFormGroup.get(this.author).value,
      genre: this.editFormGroup.get(this.genre).value,
      releaseDate: this.editFormGroup.get(this.releaseDate).value,
      imagePath: this.editFormGroup.get(this.imagePath).value
    };
    this.bookService.update(bookToUp.id, bookToUp)
      .subscribe((data) => {
        alert('Book updated!')
        this.router.navigateByUrl('/booksList')
      });
  }

}
