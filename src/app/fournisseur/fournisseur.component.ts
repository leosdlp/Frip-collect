import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../fournisseur.model';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component'

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css'],
  standalone:true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule,FormsModule, FournisseurListComponent],
})
export class FournisseurComponent implements OnInit {
  fournisseurForm!: FormGroup;

  constructor(private fb: FormBuilder, private fournisseurService: FournisseurService) {}

  ngOnInit() {
    this.fournisseurForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
    });
  }
  selectedItemFormControl = new FormControl();

  ajouterFournisseur() {
    const nouveauFournisseur: Fournisseur = this.fournisseurForm.value;
    this.fournisseurService.createFournisseur(nouveauFournisseur);
    this.fournisseurForm.reset();
  }
}
