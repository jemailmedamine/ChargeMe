import { Admin } from "./admin";
import { Born } from "./born";
import { Client } from "./client";
import { Moderateur } from "./moderateur";
import { Owner } from "./owner";
import { Reclamation } from "./reclamation";
import { Station } from "./station";

export class ReclamationSuperAdmin {
    reclamation?:Reclamation;
    born?:Born;
    client?:Client;
    station?:Station;
    moderateur?:Moderateur;
    admin?:Admin;
    owner?:Owner;

}
