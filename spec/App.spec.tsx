import { render } from "@testing-library/react";

import App from "app";

it("Проверка корневого компонента", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
