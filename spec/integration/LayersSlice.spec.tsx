import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { configureStore } from "@reduxjs/toolkit";
import {
  addLayer,
  changeLayerLabel,
  changeLayerOpacity,
  deleteLayer,
  layersSlice,
  setActiveLayer,
  toggleVisibility,
} from "features/Layers/model/slice";
import { ILayer } from "entities/LayersItem/ui/types";

describe("layersSlice", () => {
  let store: ToolkitStore;

  beforeEach(() => {
    store = configureStore({
      reducer: layersSlice.reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    const layerToAdd: ILayer = {
      id: "1",
      label: "Слой 1",
      isVisible: true,
      opacity: 75,
      sortOrder: 1,
      url: "",
    };

    store.dispatch(addLayer(layerToAdd));
  });

  it("должен установить активный слой", () => {
    const newLayer: ILayer = {
      id: "1",
      label: "Слой 1",
      isVisible: true,
      opacity: 100,
      url: "",
      sortOrder: 0,
    };

    store.dispatch(setActiveLayer(newLayer));

    expect(store.getState().activeLayer).toEqual(newLayer);
  });

  it("должен добавить слой", () => {
    const layer: ILayer = {
      id: "2",
      label: "Слой 2",
      isVisible: true,
      opacity: 100,
      url: "",
      sortOrder: 2,
    };
    store.dispatch(addLayer(layer));

    expect(store.getState().layers.length).toBe(2);
    expect(store.getState().layers[1]).toEqual(layer);
  });

  it("должен удалить слой", () => {
    store.dispatch(deleteLayer("1"));

    expect(store.getState().layers.length).toBe(0);
    expect(store.getState().layers.map((layer: ILayer) => layer.id)).not.toContain("1");
  });

  it("должен изменить видимость слоя", () => {
    const layer: ILayer = {
      id: "3",
      label: "Слой 3",
      isVisible: true,
      opacity: 100,
      url: "",
      sortOrder: 3,
    };
    store.dispatch(addLayer(layer));

    store.dispatch(toggleVisibility(layer));

    expect(store.getState().layers[0].isVisible).toBe(true);
  });

  it("должен изменить имя слоя", () => {
    const updatedLabel = "Новое имя";

    store.dispatch(changeLayerLabel({ id: "1", newLabel: updatedLabel }));

    expect(store.getState().layers[0].label).toBe(updatedLabel);
  });

  it("должен изменить прозрачность слоя", () => {
    const updatedOpacity = 50;
    store.dispatch(changeLayerOpacity({ id: "1", opacity: updatedOpacity }));

    expect(store.getState().layers[0].opacity).toBe(updatedOpacity);
  });
});
