import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ICustomer } from 'src/app/Models/ICustomer';
import { ILoginForm } from 'src/app/Models/ILoginForm';
import { IProducer } from 'src/app/Models/IProducer';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:ILoginForm={} as ILoginForm;
  fg! : FormGroup;
  constructor(
    private builder:FormBuilder,
    private _authService:AuthService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.fg=this.builder.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
  }
  public Login(form:ILoginForm)
  {
    this._authService.Login(this.loginForm).subscribe({
      next:(data:ICustomer|IProducer)=>{
        this.setUser(data);
        this._authService.ChangeWhoIsConnected();
         },

      complete: ()=>this._router.navigateByUrl("ProductList")
    })
  }
  public setUser(currentUser:ICustomer|IProducer){
    sessionStorage.clear();
    sessionStorage.setItem("customer",JSON.stringify(currentUser));
    var data=JSON.parse(sessionStorage["customer"]);
    if(typeof data.isAdmin === "undefined")
    {
      sessionStorage.clear();
      sessionStorage.setItem("producer",JSON.stringify(currentUser));
    }else if(data.isAdmin==true)
    {
      sessionStorage.clear();
      sessionStorage.setItem("admin",JSON.stringify(currentUser));
    }
  }

}
