export default interface Inscription {
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  cin: string;
  date: Date;
  site: string;
  formation: string;
  diplome: string;
  specialite?: string;
  etablissment?: string;
  mention?: string;
  adresse?: string;
}
