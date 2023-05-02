import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiPaths} from "@enums/api-paths";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  orgID! : number;
  orgName! : string;
  appUserID! : number;
  adminID = 1;
  appUserName! : string;
  appUserEmail! : string;
  role = this.getRole()

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  isAuthenticated(){
    return localStorage.getItem('userRole');
  }

  getRole(){
    return localStorage.getItem('userRole')
  }

  login(email: string){
    this.httpService.getRequest(`${ApiPaths.users}/get/email/${email}`).subscribe(
      (response: any) => {
        console.log(response)
        this.orgID = response.organization.id
        this.orgName = response.organization.name
        this.appUserID = response.id
        this.appUserName = response.name
        this.appUserEmail = response.email
      }
    )
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
