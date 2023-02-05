import { createSlice } from "@reduxjs/toolkit";


//Criando o estado inicial
const initialState = {
  mode: "dark",
};


//Criando o slicer global e passando o estado inicial e os reducers
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
        state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
});


//Exportando a função do slicer para prover na aplicação onde for necessário
export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
