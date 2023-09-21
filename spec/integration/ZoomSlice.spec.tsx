import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { decreaseZoom, increaseZoom, zoomSlice } from "entities/Zoom/model/slice";

const store: ToolkitStore = configureStore({
  reducer: zoomSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

describe("zoomSlice ", () => {
  it("увеличивает размер zoom на 5", () => {
    store.dispatch(increaseZoom());
    const newState = store.getState();
    expect(newState.zoomValue).toEqual(105);
  });

  it("уменьшает размер zoom на 5", () => {
    store.dispatch(decreaseZoom());
    const newState = store.getState();
    expect(newState.zoomValue).toEqual(100);
  });

  it("не позволяет увеличить значение zoomValue больше 200", () => {
    while (store.getState().zoomValue !== 200) {
      store.dispatch(increaseZoom());
    }
    store.dispatch(increaseZoom());
    const newState = store.getState();
    expect(newState.zoomValue).toEqual(200);
  });

  it("не позволяет установить значение zoomValue меньше 5", () => {
    while (store.getState().zoomValue !== 5) {
      store.dispatch(decreaseZoom());
    }
    store.dispatch(decreaseZoom());
    const newState = store.getState();
    expect(newState.zoomValue).toEqual(5);
  });
});
