import { ComboGroup } from "../../models/Combos";
import { Pet } from "../../models/Pets";

export interface PetGridState {
    pets: Array<Pet>;
    filteredPets: Array<Pet>;
    bonuses: Array<string>;
    bonusFilter: string[];
    expeditionBonuses: Array<string>;
    expeditionBonusFilter: string[];
    tabValue: number;
    combos: Array<ComboGroup>;
    searchTerm: string;
}
