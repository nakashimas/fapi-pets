import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PetCardProps } from './PetCardProps';
import { PetCardState } from './PetCardState';
import Divider from '@mui/material/Divider';
import './PetCard.css';
import Globals from '../../util/Globals';
import { CardActionArea, getTableHeadUtilityClass } from '@mui/material';
import PetCardDialog from '../PetCardDialog/PetCardDialog';

export default class PetCard extends React.Component<PetCardProps, PetCardState> {
    constructor(props: PetCardProps) {
        super(props);

        this.state = ({
            openDialog: false
        })
    }

    render() {
        return (
            <>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => { this.setState({ openDialog: true }) }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            title={this.props.pet.name}
                            image={require(`../../assets/sprites/${this.props.pet.name}.png`)}
                            style={{ backgroundSize: "auto" }}
                            className={`rarity-${this.props.pet.rarity}`}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {this.props.pet.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <div>
                                    Location: {this.props.pet.location.startsWith('E') ? Globals.Expeditions[this.props.pet.location] : this.props.pet.location} <br />
                                    Type: {this.props.pet.type}
                                </div>
                                <Divider>
                                    <Typography sx={{ fontWeight: 'bold' }}>Bonuses</Typography>
                                </Divider>
                                <div>
                                    {Object.keys(this.props.pet.equipped.bonuses).map((keyName, i) =>
                                        <div key={keyName}>
                                            {Globals.Bonuses[keyName]}: +{(this.props.pet.equipped.bonuses[keyName]).toFixed(2)}%
                                        </div>
                                    )}
                                </div>
                                <Divider>
                                    <Typography sx={{ fontWeight: 'bold' }}>Expedition Bonuses</Typography>
                                </Divider>
                                <div>
                                    {Object.keys(this.props.pet.expedition.bonuses).map((keyName, i) =>
                                        <div key={keyName}>
                                            {Globals.ExpeditionBonuses[keyName]}: +{(this.props.pet.expedition.bonuses[keyName]).toFixed(2)}%
                                        </div>
                                    )}
                                </div>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <PetCardDialog
                    handleClose={() => this.setState({ openDialog: false })}
                    openDialog={this.state.openDialog}
                    selectedPet={this.props.pet}
                />
            </>
        );
    }
}
