import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { Layers } from "features/Layers";
import { addLayer } from "features/Layers/model/slice";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { rootReducer } from "app/store/rootReducer";
import { ILayer } from "entities/LayersItem/ui/types";

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe("Layer Component", () => {
  let store: ToolkitStore;
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });

    const layerToAdd: ILayer = {
      id: "4",
      label: "Слой 1",
      isVisible: true,
      opacity: 75,
      sortOrder: 1,
      url: "",
    };

    store.dispatch(addLayer(layerToAdd));
  });

  it("рендерит компонент слоев и кнопку для добавления слоя", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Layers />
        </Provider>
      );
    });

    expect(screen.getByText("Слои")).toBeInTheDocument();
  });

  it("рендерит кнопку для добавления слоя", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Layers />
        </Provider>
      );
    });

    expect(screen.getByTestId("add-new-layer")).toBeInTheDocument();
  });

  it("рендерит список слоев", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Layers />
        </Provider>
      );
    });

    expect(screen.getByText("Слой 1")).toBeInTheDocument();
  });

  it("делает слой активным", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Layers />
        </Provider>
      );
    });
    const layerItem = screen.getByText("Слой 1");

    fireEvent.click(layerItem);
    expect(store.getState().activeLayer).toEqual(store.getState().layers[0]);
  });

  it("после выбора слоя рендерится слайдер", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Layers />
        </Provider>
      );
    });
    const layerItem = screen.getByText("Слой 1");

    fireEvent.click(layerItem);
    expect(screen.getByTestId("layers-slider")).toBeInTheDocument();
  });

  it("изменяет видимость слоя при нажатии на иконку глаза", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Layers />
        </Provider>
      );
    });

    fireEvent.click(screen.getByTestId("toggle-visibility-button"));

    expect(store.getState().layers.layers[0].isVisible).toBe(false);
  });
});
