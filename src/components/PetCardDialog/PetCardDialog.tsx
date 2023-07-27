import React from 'react';
import Card from '@mui/material/Card';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { PetCardDialogProps } from './PetCardDialogProps';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default class PetCardDialog extends React.Component<PetCardDialogProps, any> {
    constructor(props: PetCardDialogProps) {
        super(props);
    }

    render() {
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
