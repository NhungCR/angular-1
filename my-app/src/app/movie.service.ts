import { Injectable } from '@angular/core';
import { fakeMovies } from './fake-movies';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesURL = 'http://localhost:3000/movie';

  getMovies(): Observable<Movie[]>{
    // this.messagesService.add(`${new Date().toLocaleString()}. Get movie list`);
    // return of(fakeMovies);
    return this.http.get<Movie[]>(this.moviesURL).pipe(
      tap(receiveMovies => console.log(`receiveMovies = ${JSON.stringify(receiveMovies)}`)),
      catchError(error => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie>{
    // return of(fakeMovies.find(movie => movie.id === id));
    const url = `${this.moviesURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectedMovies => console.log(`selected movies = ${JSON.stringify(selectedMovies)}`)),
      catchError(error => of(new Movie()))
    );
  }

  updateMovie(movie: Movie): Observable<any>{
    return this.http.put(`${this.moviesURL}/${movie.id}`, movie, httpOption).pipe(
      tap(updatedMovies => console.log(`updated movies = ${JSON.stringify(updatedMovies)}`)),
      catchError(error => of(new Movie()))
      );
  }

  addMovie(newMovie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.moviesURL, newMovie, httpOption).pipe(
      tap((movie: Movie) => console.log(`inserted movies = ${JSON.stringify(movie)}`)),
      catchError(error => of(new Movie()))
      );
  }

  deleteMovie(movieID: number): Observable<Movie>{
    const url = `${this.moviesURL}/${movieID}`;
    return this.http.delete<Movie>(url, httpOption).pipe(
      tap(_ => console.log(`Deleted movie width id = ${movieID}`)),
      catchError(error => of(null))
    );
  }

  searchMovie(typedString: string): Observable<Movie[]>{
    if(!typedString.trim()){
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
      tap(foundMovies => console.log(`found movie = ${JSON.stringify(foundMovies)}`)),
      catchError(error => of(null))
    );
  }

  constructor(
    private http: HttpClient,
    public messagesService: MessagesService
    ) { }
}
