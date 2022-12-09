import { Component, OnInit } from '@angular/core';
import data from "@share/_constant/data/workprocess.json";
@Component({
  selector: 'app-home-information',
  templateUrl: './home-information.component.html',
  styleUrls: ['./home-information.component.scss']
})
export class HomeInformationComponent implements OnInit {
  public workprocess = data;
  constructor() { }

  ngOnInit(): void {
  }

}
