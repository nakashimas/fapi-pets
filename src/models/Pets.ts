import { Bonus } from "./Bonus"; 

export interface Pet {
    id: number;
    name: string;
    location: string;
    type: string;
    captureChance: number;
    pity: number;
    bonuses: Array<Bonus>;
    expeditionBonuses: Array<Bonus>;
    rarity: number;
}
