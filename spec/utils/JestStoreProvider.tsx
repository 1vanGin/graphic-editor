import React from "react";
import { Provider } from "react-redux";
import { store } from "app/store/store.tsx";

type Props = {
  children: React.ReactNode;
};

export const JestStoreProvider = ({ children }: Props) => (
  <Provider store={store}>{children}</Provider>
);
