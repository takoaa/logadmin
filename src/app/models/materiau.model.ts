export class Materiau {
  id?: number;
  nom: string;
  epaisseur: number;
  avatar?: string;  // Optional URL to an image

  constructor(nom: string, epaisseur: number, avatar?: string) {
    this.nom = nom;
    this.epaisseur = epaisseur;
    this.avatar = avatar;
  }
}