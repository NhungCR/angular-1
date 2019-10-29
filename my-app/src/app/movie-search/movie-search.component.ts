import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MovieService} from '../movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movies$: Observable<Movie[]>;
  private searchedSubject = new Subject<string>();

  constructor(private movieService: MovieService) { }
  search(searchString: string):void{
    console.log(`searchString = ${searchString}`);
    this.searchedSubject.next(searchString);
  }

  ngOnInit() {
    this.movies$ = this.searchedSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchString: string) => this.movieService.searchMovie(searchString))
    );
  }

}
