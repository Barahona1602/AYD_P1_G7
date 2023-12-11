import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {
  
  libros: any[] = [];
  loading: boolean = false;
  error: boolean = false;
  
  constructor(
    private router: Router,
    private pagesService: PagesService
  ) {}
  
  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.loading = true;
    this.pagesService.getLibros().subscribe(resp => {
      console.log(resp);
      this.libros = resp.libros;
      this.loading = false;
      this.error = false;
    }, err => {
      console.log(err);
      this.loading = false;
      this.error = true;
    });
  }

  navegarACrearLibro(): void {
    this.router.navigate(["libros", "nuevo"]);
  }
}

