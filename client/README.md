# FRONTEND

## SETUP INICIAL

Para iniciar uma aplicação React, utilizamos o comando:

```bash
    npx create-react-app client
```

## CONFICURANDO O REDUX TOOLKIT

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
```


