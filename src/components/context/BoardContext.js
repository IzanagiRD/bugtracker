// BoardContext.js
import { createContext } from "react";

export const BoardContext = createContext({
  allBoard: {
    active: 0,
    boards: []
  },
  setAllBoard: () => {}
});

// This is for utility, no changes needed to the export
export const makeid = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
