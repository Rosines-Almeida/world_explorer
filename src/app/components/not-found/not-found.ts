import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from "../../shared/components/button/button";

@Component({
  selector: 'app-not-found',
  imports: [Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFoundComponent {

  constructor( private router: Router) {}

  

  public goBack(): void {
    this.router.navigate(['/']);
  }

}
