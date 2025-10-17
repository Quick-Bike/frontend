// hooks.ts
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/Trip_Reducer"; // adjust path if store is in a different folder

// Typed versions of useDispatch and useSelector hooks for your store
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
