import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './register/login/login.component';
import { RegisterComponent } from './register/register.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { AdminComponent } from './admin/admin.component';
import { MainPageComponent } from './main-page/main-page.component';
import { StockschangeComponent } from './admin/stockschange/stockschange.component';
import { StockdetailsComponent } from './cabinet/menu/stocklist/stockdetails/stockdetails.component';
import { StockcontainerComponent } from './cabinet/menu/stocklist/stockcontainer/stockcontainer.component';
import { MystocksdetailsComponent } from './cabinet/menu/stocklist/mystocks/mystocksdetails/mystocksdetails.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'cabinet',component:CabinetComponent},
  {path:'admin',component:AdminComponent},
  {path:'mainpage',component:MainPageComponent},
  {path:'StockChange',component:StockschangeComponent},
  {path:'StockDetails',component:StockdetailsComponent},
  {path:'StockContainer',component:StockcontainerComponent},
  {path:'MyStocksDetails',component:MystocksdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
