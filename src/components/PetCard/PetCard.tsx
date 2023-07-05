import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PetCardProps } from './PetCardProps';
import { PetCardState } from './PetCardState';
import Divider from '@mui/material/Divider';
import './PetCard.css';
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
                            image={require(`../../assets/sprites/Pet${this.props.pet.id}.png`)}
                            style={{ backgroundSize: "auto" }}
                            className={`rarity-${this.props.pet.rarity}`}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {this.props.pet.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <div>
                                    Location: {this.props.pet.location} <br />
                                    Type: {this.props.pet.type}
                                </div>
                                <Divider>
                                    <Typography sx={{ fontWeight: 'bold' }}>Bonuses</Typography>
                                </Divider>
                                <div>
                                    {this.props.pet.bonuses.map(bonus => (
                                        <div key={bonus.name}>{bonus.fullText}</div>
                                    ))}
                                </div>
                                <Divider>
                                    <Typography sx={{ fontWeight: 'bold' }}>Expedition Bonuses</Typography>
                                </Divider>
                                <div>
                                    {this.props.pet.expeditionBonuses.map(bonus => (
                                        <div key={bonus.name}>{bonus.fullText}</div>
                                    ))}
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
