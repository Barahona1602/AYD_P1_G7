import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alquilar-libro',
  templateUrl: './alquilar-libro.component.html',
  styleUrls: ['./alquilar-libro.component.scss']
})
export class AlquilarLibroComponent implements OnInit{
  
  @Input() tituloLibro: string;
  fechaRetorno: Date;
  
  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {

  }

}
