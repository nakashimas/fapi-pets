import React from 'react';
import './PetGrid.css';
import petJson from '../../assets/data/pets.json';
import comboJson from '../../assets/data/pet_combos.json';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import PetCard from '../PetCard/PetCard';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { PetGridState } from './PetGridState';
import Globals from '../../util/Globals';
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
      pets: petJson.pets,
      filteredPets: petJson.pets,
      bonusFilter: [],
      tabValue: 0,
      combos: comboJson.combos,
      searchTerm: ''
    }
  }

  render() {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    const handleChange = (event: SelectChangeEvent<typeof this.state.bonusFilter>) => {
      const {
        target: { value },
      } = event;
      this.setState({
        filteredPets: value.length === 0 ? this.state.pets.filter(p => p.name.toLocaleLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()))
          : this.state.pets.filter(p => p.name.toLocaleLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()))
            .filter(p => {
              for (const bonus in p.equipped.bonuses) {
                if (value.includes(Globals.Bonuses[bonus]))
                  return true;
              }
              return false;
            }),
        bonusFilter: typeof value === 'string' ? value.split(',') : value
      })
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
                    onChange={handleChange}
                    input={<OutlinedInput label="Pet Bonuses" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={{ PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: 250, }, }, }}
                  >
                    {Object.keys(Globals.Bonuses).map((bonus: string) => (
                      <MenuItem key={bonus} value={Globals.Bonuses[bonus]}>
                        <Checkbox checked={this.state.bonusFilter.indexOf(Globals.Bonuses[bonus]) > -1} />
                        <ListItemText primary={Globals.Bonuses[bonus]} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

  private onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = event.target.value ? event.target.value : '';
    this.setState({
      searchTerm: searchTerm.toLocaleLowerCase(),
      filteredPets: this.state.pets.filter(p => p.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        .filter(p => {
          if (this.state.bonusFilter.length === 0)
            return true;
          for (const bonus in p.equipped.bonuses) {
            if (this.state.bonusFilter.includes(Globals.Bonuses[bonus]))
              return true;
          }
          return false;
        })
    });
  }
}
