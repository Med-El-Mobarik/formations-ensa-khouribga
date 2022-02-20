export default interface Inscription {
  id?:number;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  cin: string;
  date_naissance: Date;
  site: string;
  formation: string;
  diplome: string;
  specialite?: string;
  etablissment?: string;
  mention?: string;
  adresse?: string;
}
