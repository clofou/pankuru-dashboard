import {Component, OnInit} from '@angular/core';
import {Passager} from "../../../models/Passager";
import {GlobalCrudService} from "../../../services/global-crud.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-passager',
  standalone: true,
  imports: [],
  templateUrl: './passager.component.html',
  styleUrl: './passager.component.css'
})
export class PassagerComponent implements OnInit{
  passagerList: Passager[];
  idVol: number;

  constructor(private crudService: GlobalCrudService, private route: ActivatedRoute) {
    this.idVol = Number(this.route.snapshot.paramMap.get('id'));
    this.passagerList = [];
  }

  ngOnInit(): void {
    this.recupererListeDePassagers();
  }

  recupererListeDePassagers(){
    this.crudService.get("passager").subscribe({
      next: value => {
        console.log(value);
        this.passagerList = value.filter((value: { reservation: { vol: { id: number; }; }; }) => {
          return value.reservation.vol.id === this.idVol;
        });
        console.log(this.passagerList);
      },
      error: err => {
        console.log(err);
      }
    })
  }


}
