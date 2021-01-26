import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { ThingsService } from '../things.service';

@Injectable({
  providedIn: 'root'
})
export class BookService extends ThingsService<Book, string> {

  constructor(protected _http: HttpClient) {
    super(_http, environment.api.baseUrl, 'api/books/')
   }

   public getImage = (serverPath: string) => {
    return `http://localhost:5000/${serverPath}`;
  }
}
