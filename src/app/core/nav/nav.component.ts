import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  whoIsConnected!:string
  authSubscription! : Subscription;
  constructor(
    public _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this._authService.authListener().subscribe(
      state => { this.whoIsConnected = state; console.log(state);
    })
  }
  
}
