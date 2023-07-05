import { ComboGroup } from "../../models/Combos";
import { Pet } from "../../models/Pets";

export interface PetComboProps {
    combos: Array<ComboGroup>;
    pets: Array<Pet>;
}
