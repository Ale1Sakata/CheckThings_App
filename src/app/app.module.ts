import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navegation/header/header.component';
import { FooterComponent } from './navegation/footer/footer.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.route';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AboutComponent } from './institutional/about/about.component';
import { ContactComponent } from './institutional/contact/contact.component';
import { GamesListComponent } from './things/games/games-list/games-list.component';
import { GamesCreateComponent } from './things/games/games-create/games-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesEditComponent } from './things/games/games-edit/games-edit.component';
import { CommonModule } from '@angular/common';
import { FilmsListComponent } from './things/films/films-list/films-list.component';
import { FilmsCreateComponent } from './things/films/films-create/films-create.component';
import { FilmsEditComponent } from './things/films/films-edit/films-edit.component';
import { BooksListComponent } from './things/books/books-list/books-list.component';
import { BooksCreateComponent } from './things/books/books-create/books-create.component';
import { BooksEditComponent } from './things/books/books-edit/books-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    GamesListComponent,
    GamesCreateComponent,
    GamesEditComponent,
    FilmsListComponent,
    FilmsCreateComponent,
    FilmsEditComponent,
    BooksListComponent,
    BooksCreateComponent,
    BooksEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
