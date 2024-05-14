import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Materiau } from './models/materiau.model';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DatamatService {
  private baseUrl = 'http://localhost:8081/api/matiere';
  private materiauxSource = new BehaviorSubject<Materiau[]>([]);
  materiaux$ = this.materiauxSource.asObservable();
  editMode: boolean | undefined;

  constructor(private http: HttpClient) {}


  getMatiereById(id: number): Materiau | undefined {
    return this.materiauxSource.getValue().find(m => m.id === id);
  }

  


  addMateriau(materiau: Materiau): void {
    this.http.post<Materiau>(this.baseUrl, materiau).pipe(
      finalize(() => this.getAllMatieres())
    ).subscribe(response => {
      const updatedMaterials = [...this.materiauxSource.value, response];
      this.materiauxSource.next(updatedMaterials);
    });
  }
  
  updateMateriau( updatedMateriau: Materiau): void {
    const url = `${this.baseUrl}/${updatedMateriau.id}`; // Construire l'URL avec l'ID
    this.http.put<Materiau>(url, updatedMateriau).subscribe(response => {
      // Mettre à jour les données après la réussite de la requête
      const updatedMateriaux = this.materiauxSource.getValue().map(materiau => {
        if (materiau.id === updatedMateriau.id) {
          return response;
        }
        return materiau;
      });
      this.materiauxSource.next(updatedMateriaux);
    });
  }
  // Supprimer un matériau de la liste
  deleteMateriau(id: number): void {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe(() => {
      const materiaux = this.materiauxSource.getValue().filter(m => m.id !== id);
      this.materiauxSource.next(materiaux);
    });
  }

  // Récupérer tous les matériaux
  getAllMatieres(): void {
    this.http.get<Materiau[]>(this.baseUrl).subscribe((materiaux) => {
      this.materiauxSource.next(materiaux);
      return this.materiauxSource.getValue();
    });
  }
}

  
  export { Materiau };