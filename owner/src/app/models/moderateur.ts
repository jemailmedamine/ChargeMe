

export class Moderateur {
    id?: number;
    firstname?: string;
    lastname?: string;
    login?: string;
    password?: string;
    image?: string; // Optional
    phone?: string;
    connexion?: string;
    etat?: string;
    StationId?: number;
    createdAt?:string;
    updatedAt?:string;
    stationName?:string;
    moderator?:Moderateur;
    x?:Moderateur;
}
