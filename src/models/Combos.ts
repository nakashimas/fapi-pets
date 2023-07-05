import { Bonus } from "./Bonus"; 

export interface Combo {
    id: number;
    petIds: Array<number>;
}

export interface ComboGroup {
    name: string;
    combos: Array<Combo>;
}
