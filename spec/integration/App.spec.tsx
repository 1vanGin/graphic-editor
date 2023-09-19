import { render } from "@testing-library/react";
import { JestStoreProvider } from "../utils/JestStoreProvider.tsx";
import App from "app";
import { act } from "react-dom/test-utils";

it("Проверка корневого компонента", async () => {
  await act(async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });
  });
  expect(true).toBeTruthy();
});
