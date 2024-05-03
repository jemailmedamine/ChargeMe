import { Born } from "./born";
import { Client } from "./client";
import { Moderateur } from "./moderateur";
import { Reclamation } from "./reclamation";
import { Station } from "./station";

export class BigReclamation {
    reclamation?:Reclamation;
    born?:Born;
    client?:Client;
    station?:Station;
    moderateur?:Moderateur; 

}
