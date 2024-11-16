import React from 'react';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { PetCardDialogProps } from './PetCardDialogProps';
import { ComboGroup } from "../../models/Combos";
import { Pet } from "../../models/Pets";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import CardActionArea from '@mui/material/CardActionArea';
import petJson from '../../assets/data/pets.json';
import comboJson from '../../assets/data/combos.json';

export default class PetCardDialog extends React.Component<PetCardDialogProps, any> {
    constructor(props: PetCardDialogProps) {
        super(props);

        this.state = {
            combos: comboJson,
            pets: petJson,
        }
    }

    render() {
        const selectedPetCombos = this.state.combos.filter((comboGroup: ComboGroup) => (
            comboGroup.combos.some((combo) => (
                combo.petIds.includes(this.props.selectedPet.id)
            ))
        ));

        return (<>
            {this.props.selectedPet &&
                <Dialog onClose={this.handleClose} open={this.props.openDialog}>
                    <DialogTitle>{this.props.selectedPet.name}</DialogTitle>

                    <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            title={this.props.selectedPet.name}
                            image={require(`../../assets/sprites/Pet${this.props.selectedPet.id}.png`)}
                            style={{ backgroundSize: "auto" }}
                            className={`rarity-${this.props.selectedPet.rarity}`}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                <div>
                                    <div>Location: {this.props.selectedPet.location}</div>
                                    <div>Type: {this.props.selectedPet.type}</div>
                                    <div>Base Damage: {this.props.selectedPet.baseDamage}</div>
                                    {this.props.selectedPet.captureChance > 0 &&
                                        <>
                                            {/* Only render the pity & drop chance if they're nonzero - achievement pets will have these set to 0 */}
                                            <div>Base Pity: {(this.props.selectedPet.pity).toLocaleString()} {this.props.selectedPet.location.includes('(E') ? 'hrs.' : 'kills'}</div>
                                            <div>Base Drop Chance: 1/{(this.props.selectedPet.captureChance).toLocaleString()} {this.props.selectedPet.location.includes('(E') ? 'hrs.' : 'kills'}</div>
                                        </>
                                    }
                                </div>
                                <Divider>
                                    <Typography sx={{ fontWeight: 'bold' }}>Bonuses</Typography>
                                </Divider>
                                <div>
                                    {this.props.selectedPet.bonuses.map(bonus => (
                                        <div key={bonus.name}>{bonus.fullText}</div>
                                    ))}
                                </div>
                                <Divider>
                                    <Typography sx={{ fontWeight: 'bold' }}>Expedition Bonuses</Typography>
                                </Divider>
                                <div>
                                    {this.props.selectedPet.expeditionBonuses.map(bonus => (
                                        <div key={bonus.name}>{bonus.fullText}</div>
                                    ))}
                                </div>
                                <Divider>
                                    <Typography sx={{ fontWeight: 'bold' }}>Combos</Typography>
                                </Divider>
                                <div>
                                    <Grid style={{ display: 'flex' }} item xs={12} md={12} container spacing={0}>
                                    {
                                        selectedPetCombos.length > 0 ? selectedPetCombos.map((comboGroup: ComboGroup) => (
                                            comboGroup.combos.filter((combo) => (
                                                combo.petIds.includes(this.props.selectedPet.id)
                                            )).map((combo, i) => (
                                                <Grid key={combo.id} item xs={12} md={12} container spacing={0}>
                                                    <Typography>{comboGroup.name}</Typography>
                                                    <Grid style={{ display: 'flex' }} item xs={12} md={12} container spacing={0}>
                                                        {
                                                            combo.petIds.filter((petId) => (
                                                                !(petId == this.props.selectedPet.id)
                                                            )).map((petId, j) => (
                                                                <Grid key={petId} style={{ display: 'flex' }} item xs={3} md={3}>
                                                                    <Card elevation={3}>
                                                                        <CardActionArea
                                                                            sx={{ display: 'flex', minWidth: 75, justifyContent: 'center' }}
                                                                            className="combo-card"
                                                                        >
                                                                            <CardMedia
                                                                                component="img"
                                                                                sx={{ width: 75, height: 25 }}
                                                                                title={this.state.pets.filter((p: Pet) => p.id == petId)[0]?.name}
                                                                                image={require(`../../assets/sprites/Pet${petId}.png`)}
                                                                                style={{ backgroundSize: "auto", objectFit: "contain" }}
                                                                                alt={this.state.pets.filter((p: Pet) => p.id == petId)[0]?.name}
                                                                                className={`rarity-${this.state.pets.filter((p: Pet) => p.id == petId)[0].rarity}`}
                                                                            />
                                                                        </CardActionArea>
                                                                    </Card>
                                                                </Grid>
                                                            ))
                                                        }
                                                    </Grid>
                                                </Grid>
                                            ))
                                        )) : <Typography>No Combos</Typography>
                                    }
                                    </Grid>
                                </div>
                            </Typography>
                        </CardContent>
                    </Card>
                </Dialog>
            }
        </>
        );
    }

    private handleClose = () => {
        this.props.handleClose();
    }
}
