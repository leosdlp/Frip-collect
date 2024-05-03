import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importez le module des formulaires réactifs
import { AppComponent } from './app.component';
import { ProduitListComponent } from './produit/produit-list/produit-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { PanierFacturePdfComponent } from './panier/panier-facture-pdf/panier-facture-pdf.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule,ProduitListComponent, CommonModule, RouterModule.forRoot(routes), PanierFacturePdfComponent],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
