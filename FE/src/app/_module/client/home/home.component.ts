import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[HeaderService]
})
export class HomeComponent implements OnInit {

  constructor(
    private service: HeaderService
  ) { }

  ngOnInit(): void {
    this.service.setHeader(true);
  }

}
