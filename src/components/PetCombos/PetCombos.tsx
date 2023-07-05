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
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import './PetCombo.css';
import PetCardDialog from '../PetCardDialog/PetCardDialog';
import CardActionArea from '@mui/material/CardActionArea';
import comboJson from '../../assets/data/combos.json';

// TODO: add a collapse/expand-all button?

export default class PetCombos extends React.Component<PetComboProps, PetComboState> {
    constructor(props: PetComboProps) {
        super(props);

        this.state = {
            openDialog: false,
            selectedPet: null,
            combos: comboJson,
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.combos.map((comboGroup) =>
                        <Accordion key={comboGroup.name} style={{ marginTop: 20 }} defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{comboGroup.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Grid style={{ display: 'flex' }} item xs={12} md={12} container spacing={2}>
                                    {(comboGroup.combos).map(combo =>
                                        <Grid key={combo.id} style={{ display: 'flex' }} item xs={12} md={12} container spacing={2}>
                                            {combo.petIds.map((petId, i) =>
                                                <Grid key={petId} style={{ display: 'flex' }} item xs={4} md={4}>
                                                    <Card elevation={4}>
                                                        <CardActionArea sx={{ display: 'flex', minWidth: 250, justifyContent: 'left' }} className="combo-card" onClick={() => {
                                                            this.setState({ selectedPet: this.props.pets.filter(p => p.id == petId)[0], openDialog: true })
                                                        }}>
                                                            <CardMedia
                                                                component="img"
                                                                sx={{ width: 75, height: 75 }}
                                                                image={require(`../../assets/sprites/Pet${this.props.pets.filter(p => p.id == petId)[0]?.id}.png`)}
                                                                alt={this.props.pets.filter(p => p.id == petId)[0]?.name}
                                                                style={{ backgroundSize: "auto", objectFit: "contain" }}
                                                                className={`rarity-${this.props.pets.filter(p => p.id == petId)[0].rarity}`}
                                                            />
                                                            <Box sx={{ display: 'flex' }} className="combo-box">
                                                                <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                                                                    <Typography component="div" variant="h5">
                                                                        {this.props.pets.filter(p => p.id == petId)[0]?.name}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Box>
                                                        </CardActionArea>
                                                    </Card>
                                                    {(i + 1 != combo.petIds.length) && <Box className='combo-plus-icon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 100, paddingLeft: '16px' }}>
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
