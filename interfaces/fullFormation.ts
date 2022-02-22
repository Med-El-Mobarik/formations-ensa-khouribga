export default interface FullFormatio {
  id?: number;
  type: string;
  name: string;
  pole: number;
  objectif: string;
  frais_formation: string;
  frais_entretien: string;
  admission: string;
  domaine: string;
  type_formation: string;
  duree: string;
  organisation: string;
  deposition: string;
  entretien: string;
  debouches: string;
  image?: File[];
  image_name?: string;
}
