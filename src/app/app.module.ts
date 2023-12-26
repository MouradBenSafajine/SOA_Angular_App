import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ClientsComponent } from './clients/clients.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { TopThreeProductsComponent } from './top-three-products/top-three-products.component';
import { SalesByCategoryComponent } from './sales-by-category/sales-by-category.component';
import { SalesByMonthComponent } from './sales-by-month/sales-by-month.component';
import { TopWidgetsComponent } from './top-widgets/top-widgets.component';
import { LastFewTransactionsComponent } from './last-few-transactions/last-few-transactions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ChartModule } from 'angular-highcharts';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ClientsComponent,
    AjoutClientComponent,
    MainComponent,
    TopThreeProductsComponent,
    SalesByCategoryComponent,
    SalesByMonthComponent,
    TopWidgetsComponent,
    LastFewTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
