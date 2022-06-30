import { atom } from "recoil";

export const roomState = atom({
    key: "roomState",
    default: "",
});

export const roomsState = atom({
    key: "roomsState",
    default: [],
});

export const showChatState = atom({
    key: "showChatState",
    default: false,
});

export const usernameState = atom({
    key: "usernameState",
    default: "",
});

export const usersState = atom({
    key: "usersState",
    default: [],
});

export const messageState = atom({
    key: "messageState",
    default: "",
});

export const messagesState = atom({
    key: "messagesState",
    default: [],
});

export const activeUsersState = atom({
    key: "activeUsersState",
    default: [],
});

export const typingState = atom({
    key: "typingState",
    default: "",
});