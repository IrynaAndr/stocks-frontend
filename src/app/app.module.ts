import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './register/login/login.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { AdminComponent } from './admin/admin.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserinfoComponent } from './cabinet/userinfo/userinfo.component';
import { EditInfoFormComponent } from './cabinet/userinfo/edit-info-form/edit-info-form.component';
import { MenuComponent } from './cabinet/menu/menu.component';
import { StocklistComponent } from './cabinet/menu/stocklist/stocklist.component';
import { StocksComponent } from './admin/stocks/stocks.component';
import { AddEditStocksComponent } from './admin/stocks/add-edit-stocks/add-edit-stocks.component';
import { StockschangeComponent } from './admin/stockschange/stockschange.component';
import { EditStockschangeComponent } from './admin/stockschange/edit-stockschange/edit-stockschange.component';
import { TechnicalComponent } from './admin/technical/technical.component';
import { StockdetailsComponent } from './cabinet/menu/stocklist/stockdetails/stockdetails.component';
import { StockcontainerComponent } from './cabinet/menu/stocklist/stockcontainer/stockcontainer.component';
import { NotificationsComponent } from './cabinet/menu/notifications/notifications.component';
import { ComparisonComponent } from './cabinet/menu/comparison/comparison.component';
import { MystocksComponent } from './cabinet/menu/stocklist/mystocks/mystocks.component';
import { BackupComponent } from './admin/backup/backup.component';
import { TagsEditComponent } from './admin/stockschange/tags-edit/tags-edit.component';
import { MystocksdetailsComponent } from './cabinet/menu/stocklist/mystocks/mystocksdetails/mystocksdetails.component';
import { RecomendationsComponent } from './cabinet/menu/recomendations/recomendations.component';
import { PortfolioComponent } from './cabinet/menu/portfolio/portfolio.component';
import { AnalisysComponent } from './cabinet/menu/analisys/analisys.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CabinetComponent,
    AdminComponent,
    TopMenuComponent,
    MainPageComponent,
    UserinfoComponent,
    EditInfoFormComponent,
    MenuComponent,
    StocklistComponent,
    StocksComponent,
    AddEditStocksComponent,
    StockschangeComponent,
    EditStockschangeComponent,
    TechnicalComponent,
    StockdetailsComponent,
    StockcontainerComponent,
    NotificationsComponent,
    ComparisonComponent,
    MystocksComponent,
    BackupComponent,
    TagsEditComponent,
    MystocksdetailsComponent,
    RecomendationsComponent,
    PortfolioComponent,
    AnalisysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
