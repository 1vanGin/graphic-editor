import { ILayer } from "entities/LayersItem";
import { countLayerLabel } from "features/Layers/ui/lib";

describe("функция countLayerLabel", () => {
  it("должна возвращать 1, если layers пуст", () => {
    const layers: ILayer[] = [];
    const result = countLayerLabel(layers);
    expect(result).toBe(1);
  });

  it("должна правильно подсчитывать максимальный номер в label", () => {
    const layers: ILayer[] = [
      {
        label: "Layer 1",
        id: "1",
        isVisible: true,
        opacity: 75,
        sortOrder: 1,
        url: "",
      },
      {
        label: "Layer 2",
        id: "2",
        isVisible: true,
        opacity: 75,
        sortOrder: 2,
        url: "",
      },
      {
        label: "Layer 3",
        id: "3",
        isVisible: true,
        opacity: 75,
        sortOrder: 3,
        url: "",
      },
      {
        label: "Layer 10",
        id: "10",
        isVisible: true,
        opacity: 75,
        sortOrder: 4,
        url: "",
      },
      {
        label: "Layer A",
        id: "11",
        isVisible: true,
        opacity: 75,
        sortOrder: 4,
        url: "",
      },
    ];
    const result = countLayerLabel(layers);
    expect(result).toBe(11);
  });

  it("должна игнорировать нечисловые label", () => {
    const layers: ILayer[] = [
      {
        label: "Layer 1",
        id: "1",
        isVisible: true,
        opacity: 75,
        sortOrder: 1,
        url: "",
      },
      {
        label: "Layer A",
        id: "2",
        isVisible: true,
        opacity: 75,
        sortOrder: 2,
        url: "",
      },
      {
        label: "Layer B",
        id: "3",
        isVisible: true,
        opacity: 75,
        sortOrder: 3,
        url: "",
      },
    ];
    const result = countLayerLabel(layers);
    expect(result).toBe(2);
  });

  it("должна работать корректно с пустыми label", () => {
    const layers: ILayer[] = [
      {
        label: "Layer 1",
        id: "3",
        isVisible: true,
        opacity: 75,
        sortOrder: 3,
        url: "",
      },
      {
        label: "",
        id: "1",
        isVisible: true,
        opacity: 75,
        sortOrder: 1,
        url: "",
      },
      {
        label: "Layer 3",
        id: "2",
        isVisible: true,
        opacity: 75,
        sortOrder: 2,
        url: "",
      },
    ];
    const result = countLayerLabel(layers);
    expect(result).toBe(4);
  });
});
