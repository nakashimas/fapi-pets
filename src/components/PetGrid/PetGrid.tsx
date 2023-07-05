import React from 'react';
import './PetGrid.css';
import petJson from '../../assets/data/pets.json';
import comboJson from '../../assets/data/combos.json';
import bonusJson from '../../assets/data/bonuses.json';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import PetCard from '../PetCard/PetCard';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import { PetGridState } from './PetGridState';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PetCombos from '../PetCombos/PetCombos';
import { TextField } from '@mui/material';

export default class PetGrid extends React.Component<any, PetGridState> {
  constructor(props: any) {
    super(props);

    this.state = {
      pets: petJson,
      combos: comboJson,
      filteredPets: petJson,
      searchTerm: '',
      bonuses: bonusJson.petBonuses,
      bonusFilter: [],
      expeditionBonuses: bonusJson.expeditionBonuses,
      expeditionBonusFilter: [],
      tabValue: 0,
    }
  }

  render() {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    // TODO: when selecting a filter, restrict remaining options to only those that will result in some pets remaining - don't leave options open that will clear all the pets away
    const onBonusFilterChange = (event: SelectChangeEvent<typeof this.state.bonusFilter>) => {
      const value = (event.target.value as string[]) ?? [];
      this.setState((prevState) => ({
        bonusFilter: value,
        filteredPets: this.filterPets(prevState, null, value, null)
      }))
    };

    const onExpeditionBonusFilterChange = (event: SelectChangeEvent<typeof this.state.expeditionBonusFilter>) => {
      const value = (event.target.value as string[]) ?? [];
      this.setState((prevState) => ({
        expeditionBonusFilter: value,
        filteredPets: this.filterPets(prevState, null, null, value)
      }))
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      this.setState({
        tabValue: newValue
      })
    };

    return (
      <ThemeProvider theme={darkTheme}>
        <div className="pet-grid">
          <Grid item xs={12} md={12} style={{ paddingTop: 20 }}>
            <Paper style={{ padding: 20 }} elevation={2}>
              <Typography variant="body2" color="text.secondary">
                This is a list of the current pets for the idle game Farmer Against Potatoes. Support them here:&nbsp;
                <a target="_blank" rel="noopener noreferrer" href="https://store.steampowered.com/app/1535560/Farmer_Against_Potatoes_Idle/" >
                  <b>Steam</b>
                </a>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} style={{ paddingTop: 20 }}>
            <Tabs value={this.state.tabValue} onChange={handleTabChange} aria-label="Tabs">
              <Tab label="Pet List" {...a11yProps(0)} />
              <Tab label="Pet Combos" {...a11yProps(1)} />
            </Tabs>
          </Grid>
          <TabPanel value={this.state.tabValue} index={0}>
            <Grid style={{ paddingTop: 20 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={12} md={12} sx={{ display: 'flex', alignItems: 'center' }} className="filter-controls">
                <TextField
                  label="Search"
                  sx={{ width: 300, marginRight: '30px' }}
                  onChange={this.onSearchChange}
                  value={this.state.searchTerm}
                  key="search-field"
                  autoFocus
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="bonus-filter-multiple-checkbox-label">Pet Bonuses</InputLabel>
                  <Select
                    labelId="bonus-filter-multiple-checkbox-label"
                    id="bonus-filter-multiple-checkbox"
                    multiple
                    value={this.state.bonusFilter}
                    onChange={onBonusFilterChange}
                    input={<OutlinedInput label="Pet Bonuses" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={{ PaperProps: { style: { maxHeight: 48 * 9 + 8, width: 250, }, }, }}
                  >
                    {this.state.bonuses.map((bonus: string) => (
                      <MenuItem key={bonus} value={bonus}>
                        <Checkbox checked={this.state.bonusFilter.indexOf(bonus) > -1} />
                        <ListItemText primary={bonus} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="expedition-bonus-filter-multiple-checkbox-label">Expedition Bonuses</InputLabel>
                  <Select
                    labelId="expedition-bonus-filter-multiple-checkbox-label"
                    id="expedition-bonus-filter-multiple-checkbox"
                    multiple
                    value={this.state.expeditionBonusFilter}
                    onChange={onExpeditionBonusFilterChange}
                    input={<OutlinedInput label="Expedition Bonuses" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={{ PaperProps: { style: { maxHeight: 48 * 9 + 8, width: 250, }, }, }}
                  >
                    {this.state.expeditionBonuses.map((expeditionBonus: string) => (
                      <MenuItem key={expeditionBonus} value={expeditionBonus}>
                        <Checkbox checked={this.state.expeditionBonusFilter.indexOf(expeditionBonus) > -1} />
                        <ListItemText primary={expeditionBonus} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant='outlined'
                  onClick={this.onClickClear}
                >Clear</Button>
              </Grid>
              {this.state.filteredPets.map((p, i) => <Grid item xs={12} md={2.3} key={i}>
                <Item>
                  <PetCard pet={p} />
                </Item>
              </Grid>)}
            </Grid>
          </TabPanel>
          <TabPanel value={this.state.tabValue} index={1}>
            <PetCombos combos={this.state.combos} pets={this.state.pets} />
          </TabPanel>
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: 20 }} elevation={0}>
              <Typography variant="body2" color="text.secondary" textAlign={"right"}>
                Credit for the data goes to HowEasy and Hiroko. Thank you!
              </Typography>
            </Paper>
          </Grid>
        </div>
        <CssBaseline />
      </ThemeProvider>
    );

    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    interface TabPanelProps {
      children?: React.ReactNode;
      index: number;
      value: number;
    }

    function TabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            children
          )}
        </div>
      );
    }
  }

  private filterPets = function (prevState: PetGridState, newSearchTerm: string = null, newBonusFilter: string[] = null, newExpeditionBonusFilter: string[] = null) {
    const searchTerm = (newSearchTerm ?? prevState.searchTerm).toLocaleLowerCase();
    const bonusFilter = newBonusFilter ?? prevState.bonusFilter;
    const expeditionBonusFilter = newExpeditionBonusFilter ?? prevState.expeditionBonusFilter;
    let filteredPets = prevState.pets;

    if (searchTerm.length !== 0) {
      filteredPets = filteredPets.filter(pet => pet.name.toLocaleLowerCase().includes(searchTerm));
    }

    if (bonusFilter.length !== 0) {
      filteredPets = filteredPets.filter(pet => {
        for (const bonusName of bonusFilter) {
          // This pet must have all selected bonuses - return false if the pet lacks any bonus in the filter
          if (!pet.bonuses.some(petBonus => petBonus.name === bonusName)) return false;
        }

        // If we make it down here, this pet has every bonus in the filter
        return true;
      });
    }

    if (expeditionBonusFilter.length !== 0) {
      filteredPets = filteredPets.filter(pet => {
        for (const bonusName of expeditionBonusFilter) {
          // This pet must have all selected bonuses - return false if the pet lacks any bonus in the filter
          if (!pet.expeditionBonuses.some(petBonus => petBonus.name === bonusName)) return false;
        }

        // If we make it down here, this pet has every bonus in the filter
        return true;
      });
    }

    return filteredPets;
  }

  private onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = (event.target.value ?? '').toLocaleLowerCase();
    this.setState((prevState) => ({
      searchTerm: searchTerm,
      filteredPets: this.filterPets(prevState, searchTerm, null, null)
    }));
  }

  private onClickClear = () => {
    this.setState({
      searchTerm: "",
      bonusFilter: [],
      expeditionBonusFilter: [],
      filteredPets: this.state.pets
    });
  }
}
