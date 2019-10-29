import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule} from '@angular/forms';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieService } from './movie.service';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './messages.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieSearchComponent } from './movie-search/movie-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MovieSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MovieService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
