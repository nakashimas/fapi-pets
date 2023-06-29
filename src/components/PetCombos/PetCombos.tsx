import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { PetComboProps } from './PetCombosProps';
import { PetComboState } from './PetCombosState';
import { Combo } from '../../models/Combos';
import Globals from '../../util/Globals';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import './PetCombo.css';
import PetCardDialog from '../PetCardDialog/PetCardDialog';
import CardActionArea from '@mui/material/CardActionArea';

export default class PetCombos extends React.Component<PetComboProps, PetComboState> {
    constructor(props: PetComboProps) {
        super(props);

        this.state = {
            openDialog: false,
            selectedPet: null 
        }
    }

    render() {
        const base_residue: Array<Combo> = this.props.combos[0]["base_residue"];
        const equipment_rarity: Array<Combo> = this.props.combos[1]["equipment_rarity"];
        const drop_chance: Array<Combo> = this.props.combos[2]["drop_chance"];
        const potatoes_spawn: Array<Combo> = this.props.combos[3]["potatoes_spawn"];
        const potatoes_per_wave: Array<Combo> = this.props.combos[4]["potatoes_per_wave"];
        const potatoes_spawn_speed: Array<Combo> = this.props.combos[5]["potatoes_spawn_speed"];
        const expedition_reward: Array<Combo> = this.props.combos[6]["expedition_reward"];
        const expedition_damage: Array<Combo> = this.props.combos[7]["expedition_damage"];
        const breed_timer: Array<Combo> = this.props.combos[8]["breed_timer"];
        const milk_timer: Array<Combo> = this.props.combos[9]["milk_timer"];
        const attack_speed: Array<Combo> = this.props.combos[10]["attack_speed"];
        const whack_buff_duration: Array<Combo> = this.props.combos[11]["whack_buff_duration"];
        const combos: any = {
            base_residue: base_residue,
            equipment_rarity: equipment_rarity,
            drop_chance: drop_chance,
            potatoes_spawn: potatoes_spawn,
            potatoes_per_wave: potatoes_per_wave,
            potatoes_spawn_speed: potatoes_spawn_speed,
            expedition_reward: expedition_reward,
            expedition_damage: expedition_damage,
            breed_timer: breed_timer,
            milk_timer: milk_timer,
            attack_speed: attack_speed,
            whack_buff_duration: whack_buff_duration
        }

        return (
            <div>
                {
                    Object.keys(Globals.Combos).map((keyName, i) =>
                        <Accordion key={keyName} style={{ marginTop: 20 }} defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{Globals.Combos[keyName]}</Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Grid style={{ display: 'flex' }} item xs={12} md={12} container spacing={2}>
                                    {(combos[keyName] as Array<Combo>).map(c =>
                                        <Grid key={keyName} style={{ display: 'flex' }} item xs={12} md={12} container spacing={2}>
                                            {c.pet_ids.map((id, i) =>
                                                <Grid key={id} style={{ display: 'flex' }} item xs={4} md={4}>
                                                    <Card elevation={4}>
                                                        <CardActionArea sx={{ display: 'flex', minWidth: 250, justifyContent: 'left' }} className="combo-card" onClick={() => {
                                                            this.setState({ selectedPet: this.props.pets.filter(p => p.id == id.toString())[0], openDialog: true })
                                                        }}>
                                                            <CardMedia
                                                                component="img"
                                                                sx={{ width: 75, height: 75 }}
                                                                image={require(`../../assets/sprites/${this.props.pets.filter(p => p.id == id.toString())[0]?.name}.png`)}
                                                                alt={this.props.pets.filter(p => p.id == id.toString())[0]?.name}
                                                                style={{ backgroundSize: "auto", objectFit: "contain" }}
                                                                className={`rarity-${this.props.pets.filter(p => p.id == id.toString())[0].rarity}`}
                                                            />
                                                            <Box sx={{ display: 'flex' }} className="combo-box">
                                                                <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                                                                    <Typography component="div" variant="h5">
                                                                        {this.props.pets.filter(p => p.id == id.toString())[0]?.name}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Box>
                                                        </CardActionArea>
                                                    </Card>
                                                    {(i + 1 != c.pet_ids.length) && <Box className='combo-plus-icon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 100, paddingLeft: '16px' }}>
                                                        <AddIcon fontSize={"large"} />
                                                    </Box>}
                                                </Grid>
                                            )}
                                        </Grid>
                                    )}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>)
                }
                {this.state.selectedPet &&
                    < PetCardDialog
                        handleClose={() => this.setState({ openDialog: false })}
                        openDialog={this.state.openDialog}
                        selectedPet={this.state.selectedPet}
                    />
                }
            </div>
        );
    }
}
