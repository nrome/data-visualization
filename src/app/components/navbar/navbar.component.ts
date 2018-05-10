// angular
import { Component, OnInit } from '@angular/core';
// services
import { Router } from '@angular/router';
// models

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
