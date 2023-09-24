import { ILayer } from "entities/LayersItem";

export const countLayerLabel = (layers: ILayer[]) => {
  let count = 0;
  if (layers.length > 0) {
    layers.forEach((item) => {
      let numEl = 0;
      if (typeof item.label === "string") {
        const matchResult = item.label.match(/\d+/);

        if (matchResult !== null) {
          numEl = parseInt(matchResult[0]);
        }
      }

      if (numEl > count) {
        count = numEl;
      }
    });
  }
  return count + 1;
};
