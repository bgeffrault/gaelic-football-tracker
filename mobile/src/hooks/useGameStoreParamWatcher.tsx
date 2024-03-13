import { useEffect } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
} from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../stores/store";
import { Rules } from "../components/ControlledComponents";
import { GameSliceState, setGame } from "../stores";

export const useGameStoreParamWatcher = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues> &
    keyof GameSliceState,
>({
  control,
  name,
  rules,
  defaultValue,
  onChange,
}: {
  control: Control<TFieldValues>;
  name: TName;
  rules?: Rules;
  defaultValue?: PathValue<TFieldValues, TName>;
  onChange?: (value: PathValue<TFieldValues, TName>) => unknown;
}) => {
  const dispatch = useDispatch();
  const storeValue = useAppSelector(
    (state) => state.game[name as keyof GameSliceState],
  );
  const { field } = useController<TFieldValues, TName>({
    control,
    name,
    rules,
  });

  useEffect(() => {
    dispatch(setGame({ [name]: defaultValue }));
  }, []);

  useEffect(() => {
    const newValue = onChange
      ? onChange(storeValue as PathValue<TFieldValues, TName>) // Not totaly true
      : storeValue;
    field.onChange(newValue);
  }, [storeValue]);
};
