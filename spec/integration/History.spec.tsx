import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "app/store/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { History } from "features/History";
import { act } from "react-dom/test-utils";
import { addAction } from "features/History/model/slice";
import { IHistoryAction, Instrument } from "entities/ActionItem";

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe("History Component", () => {
  let store: ToolkitStore;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });

    const actionToAdd: IHistoryAction = {
      id: "1",
      label: "Действие 1",
      isCancel: false,
      instrument: Instrument.line,
      startPoint: { x: 100, y: 100 },
      flashingPoints: [{ x: 100, y: 100 }],
      endPoint: { x: 200, y: 200 },
      layerId: "1",
      color: "red",
    };

    store.dispatch(addAction(actionToAdd));
  });

  it("рендерит компонент", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <History />
        </Provider>
      );
    });
    const textElement = screen.getByText("История");
    expect(textElement).toBeInTheDocument();
  });

  it("рендерит список действий", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <History />
        </Provider>
      );
    });

    expect(screen.getByText("Действие 1")).toBeInTheDocument();
  });

  it("взаимодействует с историей, изменяет состояние действия (isCanceled) на true", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <History />
        </Provider>
      );
    });

    const actionItem = screen.getByText("Действие 1");

    fireEvent.click(actionItem);
    expect(store.getState().history.history[0].isCancel).toBe(true);
  });

  it("взаимодействует с историей, изменяет состояние действия (isCanceled) на true, а по второму клику изменяет на false", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <History />
        </Provider>
      );
    });

    const actionItem = screen.getByText("Действие 1");

    fireEvent.click(actionItem);
    expect(store.getState().history.history[0].isCancel).toBe(true);
    fireEvent.click(actionItem);
    expect(store.getState().history.history[0].isCancel).toBe(false);
  });
});
