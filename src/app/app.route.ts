import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './institutional/about/about.component';
import { ContactComponent } from './institutional/contact/contact.component';
import { BooksCreateComponent } from './things/books/books-create/books-create.component';
import { BooksEditComponent } from './things/books/books-edit/books-edit.component';
import { BooksListComponent } from './things/books/books-list/books-list.component';
import { FilmsCreateComponent } from './things/films/films-create/films-create.component';
import { FilmsEditComponent } from './things/films/films-edit/films-edit.component';
import { FilmsListComponent } from './things/films/films-list/films-list.component';
import { GamesCreateComponent } from './things/games/games-create/games-create.component';
import { GamesEditComponent } from './things/games/games-edit/games-edit.component';
import { GamesListComponent } from './things/games/games-list/games-list.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'contact', component: ContactComponent},

    { path: 'gamesList', component: GamesListComponent},
    { path: 'gamesCreate', component: GamesCreateComponent},
    { path: 'gamesEdit/:id', component: GamesEditComponent},

    { path: 'filmsList', component: FilmsListComponent},
    { path: 'filmsCreate', component: FilmsCreateComponent},
    { path: 'filmsEdit/:id', component: FilmsEditComponent},

    { path: 'booksList', component: BooksListComponent},
    { path: 'booksCreate', component: BooksCreateComponent},
    { path: 'booksEdit/:id', component: BooksEditComponent}
];
