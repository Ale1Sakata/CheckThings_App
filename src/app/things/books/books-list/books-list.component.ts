import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styles: [
  ]
})
export class BooksListComponent implements OnInit {

  books: Book[] = [];

  constructor(
    public bookService: BookService
    ) { }

  ngOnInit() {
    this.bookService.getAll().subscribe((data: Book[]) => {
      console.log(data);
      this.books = data;
    })
  }

  public getImgPath (serverPath: string) {
    return this.bookService.getImage(serverPath);
  }

  deleteBook(bookName, bookId) {
    const accept = confirm('Do you want to delete the book: ' + bookName + '?');
    if (accept) {
      this.bookService.delete(bookId).subscribe((data) => {
        alert('Book deleted!')
        this.ngOnInit();
      });
    }
  }

}
