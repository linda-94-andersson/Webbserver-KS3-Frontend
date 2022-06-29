import { atom } from "recoil";

export const roomState = atom({
    key: "roomState",
    default: "",
});

export const roomsState = atom({
    key: "roomsState",
    default: [],
});

