import { ComboGroup } from "../../models/Combos";
import { Pet } from "../../models/Pets";

export interface PetComboState {
    openDialog: boolean;
    selectedPet: Pet;
    combos: Array<ComboGroup>;
}
