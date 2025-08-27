// src/utils/localStorage.js
const DEFAULT_PREFIX = "myshop_v1"; // change if you want a namespace/version

export const loadState = (key = "cart") => {
  try {
    const serialized = localStorage.getItem(`${DEFAULT_PREFIX}:${key}`);
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.warn("loadState: could not read from localStorage", err);
    return undefined;
  }
};

export const saveState = (state, key = "cart") => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(`${DEFAULT_PREFIX}:${key}`, serialized);
  } catch (err) {
    // quota exceeded or blocked - ignore but warn
    console.warn("saveState: could not write to localStorage", err);
  }
};

export const removeState = (key = "cart") => {
  try {
    localStorage.removeItem(`${DEFAULT_PREFIX}:${key}`);
  } catch (err) {
    console.warn("removeState: could not remove from localStorage", err);
  }
};
