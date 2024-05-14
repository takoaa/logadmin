import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatamatService} from '../datamat.service';
import { Materiau } from '../models/materiau.model';
@Component({
  selector: 'app-ajout-materiau',
  templateUrl: './ajout-materiau.component.html',
  styleUrls: ['./ajout-materiau.component.css'] // Fix the typo here, it should be styleUrls instead of styleUrl
})
export class AjoutMateriauComponent {
  isVisible: boolean = false; // Assuming this controls the dialog visibility

  constructor(
    private datamatService: DatamatService,
    public dialogRef: MatDialogRef<AjoutMateriauComponent>
  ) { }

  closeDialog(): void {
    this.isVisible = false;
    this.dialogRef.close(); // Close the dialog
  }

  submitForm(nom: string, epaisseur: number, ): void {
    const materiau: Materiau = { nom, epaisseur};
    this.datamatService.addMateriau(materiau);
    this.closeDialog(); // Close the dialog after adding the material
  }
}
