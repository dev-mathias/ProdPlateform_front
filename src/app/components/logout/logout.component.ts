import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private _router:Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  public deconnexion(){
    sessionStorage.clear();
    this._authService.ChangeWhoIsConnected();
    this._router.navigateByUrl('/Login');
    
  }
}
