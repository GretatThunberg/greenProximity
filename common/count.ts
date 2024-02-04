import { PlacesService } from '@app/interfaces/Service';
export interface Count {
    school: Groupe;
    restaurant: Groupe;
    groceryStore: Groupe;
    park: Groupe;
    drugStore: Groupe;
    gym: Groupe;
    hospital: Groupe;
    bus: Groupe;
}

export interface Groupe {
    listPlace: PlacesService[];
    nombre: number;
}
