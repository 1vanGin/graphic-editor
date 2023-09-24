import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { configureStore } from "@reduxjs/toolkit";
import {
  addAction,
  historySlice,
  clear,
  toggleCanceledAction,
  undo,
  redo,
} from "features/History/model/slice";
import { IHistoryAction, Instrument } from "entities/ActionItem";

describe("historySlice", () => {
  let store: ToolkitStore;

  beforeEach(() => {
    store = configureStore({
      reducer: historySlice.reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
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

  afterEach(() => {
    store.dispatch(clear());
  });

  it("должен добавить действие в историю", () => {
    const actionToAdd2: IHistoryAction = {
      id: "2",
      label: "Действие 2",
      isCancel: false,
      instrument: Instrument.line,
      startPoint: { x: 200, y: 200 },
      flashingPoints: [{ x: 200, y: 200 }],
      endPoint: { x: 300, y: 300 },
      layerId: "1",
      color: "red",
    };
    store.dispatch(addAction(actionToAdd2));

    expect(store.getState().history.length).toBe(2);
    expect(store.getState().history[0]).toEqual(actionToAdd2);
  });

  it("должен переключить состояние isCancel действия", () => {
    const firstHistoryElement = store.getState().history[0];

    store.dispatch(toggleCanceledAction(firstHistoryElement));
    expect(firstHistoryElement.isCancel).toBe(false);
  });

  it("должен выполнить отмену (undo)", () => {
    const actionToAdd3: IHistoryAction = {
      id: "3",
      label: "Действие 3",
      isCancel: false,
      instrument: Instrument.line,
      startPoint: { x: 600, y: 600 },
      flashingPoints: [{ x: 600, y: 600 }],
      endPoint: { x: 800, y: 800 },
      layerId: "1",
      color: "red",
    };

    const actionToAdd4: IHistoryAction = {
      id: "4",
      label: "Действие 4",
      isCancel: false,
      instrument: Instrument.line,
      startPoint: { x: 4, y: 69 },
      flashingPoints: [{ x: 4, y: 69 }],
      endPoint: { x: 58, y: 80 },
      layerId: "4",
      color: "red",
    };
    store.dispatch(addAction(actionToAdd3));
    store.dispatch(addAction(actionToAdd4));
    store.dispatch(undo());

    expect(store.getState().history[0].isCancel).toBe(true);
    expect(store.getState().history[1].isCancel).toBe(false);
  });

  it("должен выполнить возврат (redo)", () => {
    const actionToAdd3: IHistoryAction = {
      id: "3",
      label: "Действие 3",
      isCancel: false,
      instrument: Instrument.line,
      startPoint: { x: 600, y: 600 },
      flashingPoints: [{ x: 600, y: 600 }],
      endPoint: { x: 800, y: 800 },
      layerId: "1",
      color: "red",
    };

    const actionToAdd4: IHistoryAction = {
      id: "4",
      label: "Действие 4",
      isCancel: false,
      instrument: Instrument.line,
      startPoint: { x: 4, y: 69 },
      flashingPoints: [{ x: 4, y: 69 }],
      endPoint: { x: 58, y: 80 },
      layerId: "4",
      color: "red",
    };
    store.dispatch(addAction(actionToAdd3));
    store.dispatch(addAction(actionToAdd4));
    store.dispatch(undo());
    store.dispatch(redo());

    expect(store.getState().history[0].isCancel).toBe(false);
    expect(store.getState().history[1].isCancel).toBe(false);
  });

  it("должен очистить историю", () => {
    store.dispatch(clear());

    expect(store.getState().history.length).toBe(0);
  });
});
