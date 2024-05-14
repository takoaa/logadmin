import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { DatamatService } from '../datamat.service';
import { Materiau } from '../models/materiau.model';
import { filter, map } from 'rxjs/operators';

import { AjoutMateriauComponent } from '../ajout-materiau/ajout-materiau.component';

@Component({
  selector: 'app-matieres',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  matiere: Materiau = new Materiau('', 0); // Default values assuming 'nom' and 'epaisseur' are required
  editMode: boolean = false;
  isVisible: boolean = true;  
  materiaux$: Observable<Materiau[]> | undefined; // Used to store and display materials

  constructor(
    private route: ActivatedRoute,
    private datamatService: DatamatService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadInitialData();
    this.handleQueryParams();
  }

  loadInitialData() {
    this.datamatService.getAllMatieres();
    this.materiaux$ = this.datamatService.materiaux$;
  }

  handleQueryParams() {
    this.route.queryParams.pipe(
      filter(params => params['nom'] && params['epaisseur']),
      map(params => ({
        id: params['id'],
        nom: params['nom'],
        epaisseur: +params['epaisseur'],
        avatar: params['avatar'] || undefined
      }))
    ).subscribe(materiau => {
      if (materiau.id) {
        this.datamatService.updateMateriau(materiau);
      } else {
        this.datamatService.addMateriau(materiau);
      }
      // Clear queryParams to avoid duplicate handling
      this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
    });
  }

  openDialog(): void {
    // Créer un nouveau matériau chaque fois que le dialogue est ouvert pour l'ajout
    this.matiere = new Materiau('', 0); // Réinitialiser la matière
    const dialogRef = this.dialog.open(AjoutMateriauComponent, {
      width: '250px',
      data: { editMode: !!this.matiere.id, matiere: this.matiere }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.datamatService.updateMateriau(result);
        } else {
          this.datamatService.addMateriau(result);
        }
        // Optionnellement, rafraîchir la liste après modification
        this.datamatService.getAllMatieres();
      }
    });
  }

  updateMatiere(matiere: Materiau): void {
    this.matiere = { ...matiere };
    this.openDialog();
  }

  deleteMatiere(id: number): void {
    this.datamatService.deleteMateriau(id);
  }
}