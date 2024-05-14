import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { DatamatService } from '../datamat.service';
import { Materiau } from '../models/materiau.model';

import { AjoutMateriauComponent } from '../ajout-materiau/ajout-materiau.component';

@Component({
  selector: 'app-matieres',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  matiere: Materiau = { nom: '', epaisseur: 0 }; // Initialize properties correctly
  editMode: boolean = false;
  isVisible: boolean = true;  
  materiaux$: Observable<Materiau[]> | undefined;

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
    this.route.queryParams.subscribe(params => {
      const materiau: Materiau = {
        id: params['id'] ? +params['id'] : undefined,
        nom: params['nom'] || '',
        epaisseur: params['epaisseur'] ? +params['epaisseur'] : 0,
        avatar: params['avatar'] || undefined
      };
      if (materiau.id) {
        this.datamatService.updateMateriau(materiau);
      } else {
        this.datamatService.addMateriau(materiau);
      }
      this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutMateriauComponent, {
      width: '250px',
      data: { editMode: !!this.matiere.id, matiere: this.matiere }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result here if needed
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
