import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedicineListComponent} from "@medicine/medicine-list/medicine-list.component";
import {MedicineBillingComponent} from "@medicine/medicine-billing/medicine-billing.component";
import {CheckoutComponent} from "@medicine/medicine-billing/checkout/checkout.component";
import {AuthGuard} from "@authentication/auth.guard";

const routes: Routes = [
  {path: "", canActivateChild: [AuthGuard], children: [
      {path: "", component: MedicineListComponent,data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
        }
      },
      {path: "billing", component: MedicineBillingComponent, data:{
          role:["ROLE_PHARMACIST"]
        }
      },
      {path: "checkout", component: CheckoutComponent,  data:{
          role:["ROLE_PHARMACIST"]
        }
      }
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
