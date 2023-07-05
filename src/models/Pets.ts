import { Bonus } from "./Bonus"; 

export interface Pet {
    id: number;
    name: string;
    location: string;
    type: string;
    pity: number;
    bonuses: Array<Bonus>;
    expeditionBonuses: Array<Bonus>;
    rarity: number;
}
