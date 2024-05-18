import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatamatService } from '../datamat.service';
import { Materiau } from '../models/materiau.model';

@Component({
  selector: 'app-ajout-materiau',
  templateUrl: './ajout-materiau.component.html',
  styleUrls: ['./ajout-materiau.component.css']
})
export class AjoutMateriauComponent {
  isVisible: boolean = false;

  constructor(
    private datamatService: DatamatService,
    public dialogRef: MatDialogRef<AjoutMateriauComponent>
  ) { }

  closeDialog(result: boolean = false): void {
    this.dialogRef.close(result);
  }

  submitForm(name: string, type: string, thicknessOptions: string, codeTar: string, brilliance: string, unit: string, characteristics: string, faceOptions?: string): void {
    const materiau: Materiau = {
      name,
      type,
      thicknessOptions,
      codeTar,
      brilliance,
      unit,
      characteristics,
      faceOptions
    };
    this.datamatService.addMateriau(materiau).subscribe(() => {
      this.closeDialog(true);
    });
  }
}
