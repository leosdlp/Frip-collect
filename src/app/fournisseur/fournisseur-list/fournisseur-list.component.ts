import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../fournisseur.model';
import { CommonModule } from '@angular/common';
import { FournisseurService } from '../../fournisseur.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-fournisseur-list',
  standalone: true,
  templateUrl: './fournisseur-list.component.html',
  styleUrl: './fournisseur-list.component.css',
  imports: [CommonModule,RouterOutlet,RouterModule, FormsModule],
})

export class FournisseurListComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  rechercheFournisseur = '';

  constructor(private fournisseurService: FournisseurService, private router: Router) {
  }

  ngOnInit(): void {
    this.fournisseurs = this.fournisseurService.getFournisseurs();
  }

  filtrerFournisseurs() {
    if (this.rechercheFournisseur === '') {
      this.fournisseurs = this.fournisseurService.getFournisseurs();
    } else {
      this.fournisseurs = this.fournisseurService.getFournisseurs().filter(fournisseur =>
        fournisseur.nom.toLowerCase().includes(this.rechercheFournisseur.toLowerCase())
      );
    }
  }

  modifierFournisseur(id: number) {
    this.fournisseurService.setSelectedFournisseurId(id);
    this.router.navigate(['/fournisseur-modifier', id]);
  }

  supprimerFournisseur(id: number) {
    this.fournisseurService.deleteFournisseur(id);
    this.filtrerFournisseurs();
  }
}
