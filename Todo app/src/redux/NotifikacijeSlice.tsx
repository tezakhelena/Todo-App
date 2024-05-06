import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Moment } from 'moment';

export interface Notifikacija {
    id: number;
    naslov: string;
    opis: string;
    datumKreiranja?: Date;
    procitano: boolean;
}

export interface NotifikacijaState {
    notifikacija: Notifikacija[];
}

const initialState: NotifikacijaState = {
    notifikacija: [],
};

export const notifikacijeSlice = createSlice({
    name: 'notifikacija',
    initialState,
    reducers: {
        dodajNotifikaciju: (state, action: PayloadAction<{opis: string, naslov: string}>) => {
            const novaNotifikacija: Notifikacija = {
                id: new Date().getTime(),
                naslov: action.payload.naslov,
                opis:action.payload.opis,
                datumKreiranja: new Date(),
                procitano: false
            };
            state.notifikacija.push(novaNotifikacija);
        },
        oznaciNotifikacijeProcitanima: (state) => {
            state.notifikacija = state.notifikacija.map(notifikacija => ({
                ...notifikacija,
                procitano: true,
            }));
        },
        resetNotifikacije: (state) => {
            state.notifikacija = initialState.notifikacija;
        }
    },
});

export const {dodajNotifikaciju, oznaciNotifikacijeProcitanima, resetNotifikacije } = notifikacijeSlice.actions;

export default notifikacijeSlice.reducer;
