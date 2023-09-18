import { render } from "@testing-library/react";
import { JestStoreProvider } from "../utils/JestStoreProvider.tsx";
import App from "app";

it("Проверка корневого компонента", () => {
  render(<App />, {
    wrapper: JestStoreProvider,
  });
  expect(true).toBeTruthy();
});
