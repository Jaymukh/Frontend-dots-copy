import { atom } from "recoil";

export const visiblePanelState = atom({
    key: 'visiblePanel',
    default: window.location.pathname || '/profile',
});

export const helpState = atom({
    key: 'showHelp',
    default: 0,
});

export const overlayState = atom({
    key: 'overlay',
    default: false,
});

export const spinnerState = atom({
    key: 'spinner',
    default: false,
})

export const spinnerLiteState = atom({
    key: 'spinnerLite',
    default: false,
})