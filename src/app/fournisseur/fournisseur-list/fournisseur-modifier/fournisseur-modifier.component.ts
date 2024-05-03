import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../../../fournisseur.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FournisseurListComponent } from '../../fournisseur-list/fournisseur-list.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fournisseur-modifier',
  templateUrl: './fournisseur-modifier.component.html',
  styleUrls: ['./fournisseur-modifier.component.css'],
  standalone:true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterModule]
})
export class FournisseurModifierComponent implements OnInit {
  fournisseurForm: FormGroup;
  fournisseurId: number = 0;

  constructor(private fb: FormBuilder, private router: Router, private fournisseurService: FournisseurService, private fournisseurListComponent: FournisseurListComponent) {
    this.fournisseurForm = this.fb.group({
      id:[],
      nom: [''],
    });
  }

  ngOnInit(): void {
    this.fournisseurId = this.fournisseurService.getSelectedFournisseurId();
    const fournisseur = this.fournisseurService.getFournisseurById(this.fournisseurId);

    if (fournisseur) {
      this.fournisseurForm.patchValue({
        id: this.fournisseurId,
        nom: fournisseur.nom,
      });
    }
  }

  modifierFournisseur() {
    const fournisseurModifie = this.fournisseurForm.value;
    this.fournisseurService.updateFournisseur(this.fournisseurId, fournisseurModifie);
  }
}
