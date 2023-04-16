import {Injectable, OnInit} from '@angular/core';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {Params} from "@angular/router";
import {Diagnostic} from "@models/diagnostic";

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService{

  diagnostics!: Diagnostic[];
  totalDiagnostics!: number;
  selectedDiags!: Diagnostic[];

  adminUrl : string = ApiPaths.diagnostic;
  orgAdminUrl : string = ApiPaths.orgDiag;

  ref!: DynamicDialogRef;

  editMode : boolean = false;
  role: string = 'admin';

  constructor(public httpService: HttpService) { }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  getData(queryParams: Params){
    if (this.role === 'admin'){
      this.httpService.getRequestWithParams(`${this.adminUrl}/search`, queryParams).subscribe(
        (response: any) => {
          this.diagnostics = response.content;
          this.totalDiagnostics = response.totalElements;
          // console.log(response);
        }
      )
    }
    else {
      this.httpService.getRequestWithParams(`${this.orgAdminUrl}/organization/1/search`, queryParams).subscribe(
        (response: any) => {
          this.diagnostics = response.content;
          this.totalDiagnostics = response.totalElements;
        }
      )
    }
  }

  appendValue(){
    if(this.role === 'admin'){
      this.httpService.createRequest(`${this.adminUrl}/add/all`, this.selectedDiags).subscribe();
    }
    else{
      this.httpService.createRequest(`${this.orgAdminUrl}/add`, this.selectedDiags).subscribe();
    }

    this.ref.close();
  }

  updateValue(index: number, value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>){
    // this.diagnostics[index].price = value.diagPrice;
    let item = this.diagnostics[index];
    let body;
    if(this.role === 'admin'){
      body = {"id": item.id, ...value};
      this.httpService.updateRequest(`${this.adminUrl}/update`, body).subscribe();
      // this.diagnostics[index].serviceName = value.diagName;
    }
    else{
      body = {"id": item.id, "price": value.price, "organizationId": item.organizationId};
      this.httpService.updateRequest(`${this.orgAdminUrl}/update`, body).subscribe();
    }
    // console.log(body)
    this.ref.close();
  }

  deleteValue(index: number){
    if(this.role === 'admin'){
      this.httpService.deleteRequest(`${this.adminUrl}/delete/${this.diagnostics[index].id}`).subscribe();
    }
    else{
      this.httpService.deleteRequest(`${this.orgAdminUrl}/delete/${this.diagnostics[index].id}`).subscribe();
    }
  }

  // searchValue(queryParams: Params){
  //   if (this.role === 'admin'){
  //     this.httpService.getRequest(`${this.adminUrl}/search`, queryParams).subscribe(
  //       (response: any) => {
  //         this.diagnostics = response;
  //         console.log("Search called");
  //       }
  //     )
  //   }
  //   else {
  //     this.httpService.getRequest(`${this.orgAdminUrl}/search`, queryParams).subscribe(
  //       (response: any) => {
  //         this.diagnostics = response;
  //       }
  //     )
  //   }
  // }

}
