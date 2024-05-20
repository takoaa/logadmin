import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { DatamatService } from '../datamat.service';
import { Materiau } from '../models/materiau.model';
import { AjoutMateriauComponent } from '../ajout-materiau/ajout-materiau.component';

@Component({
  selector: 'app-matieres',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
  materiaux$!: Observable<Materiau[]>; // This will hold the materials data
  isVisible: boolean = true;  // This is used to show or hide parts of your template
  selectedFile: File | null = null;

  materiaux: Materiau[] = [];

  constructor(
    private datamatService: DatamatService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }
  loadInitialData(): void {
    this.materiaux$ = this.datamatService.getAllMatieres();
  }  openDialog(materiau?: Materiau): void {
    const dialogRef = this.dialog.open(AjoutMateriauComponent, {
      width: '250px',
      data: { materiau: materiau || this.createNewMateriau() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInitialData();  // Refresh the list if there was a change
      }
    });
  }

  createNewMateriau(): Materiau {
    return {
      id: undefined, // or null, if your backend supports it
      name: '',
      type: '',
      thicknessOptions: '',
      codeTar: '',
      brilliance: '',
      unit: '',
      characteristics: '',
      faceOptions: ''
    };
  }

  

  updateMatiere(materiau: Materiau): void {
    this.openDialog(materiau);  // Opens the dialog with existing material data
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.datamatService.uploadFile(this.selectedFile).subscribe({
        next: response => this.snackBar.open('File uploaded successfully: ' + response, 'Close', { duration: 3000 }),
        error: error => this.snackBar.open('File upload failed: ' + error.message, 'Close', { duration: 3000 })
      });
    } else {
      this.snackBar.open('No file selected', 'Close', { duration: 3000 });
    }
  }

   deleteMatiere(id: number): void {
    this.datamatService.deleteMaterial(id).subscribe({
      next: () => {
        this.snackBar.open('Material deleted successfully', 'Close', { duration: 1000 });
        this.loadInitialData();
      },
      error: error => this.snackBar.open('Failed to delete material: ' + error.message, 'Close', { duration: 1000 })
    });
  }


saveMateriau(materiau: Materiau): void {
  const operation = materiau.id ? 
    this.datamatService.updateMateriau(materiau.id, materiau) :
    this.datamatService.addMateriau(materiau);
  
  operation.subscribe({
    next: (res) => {
      this.snackBar.open('Material saved successfully', 'Close', { duration: 2000 });
      this.loadInitialData();  // Reload data to refresh the list
    },
    error: (error) => this.snackBar.open('Failed to save material: ' + error.message, 'Close', { duration: 2000 })
  });
}
}