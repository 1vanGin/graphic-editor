import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { rootReducer } from "app/store/rootReducer";
import { Zoom } from "entities/Zoom";

const store: ToolkitStore = configureStore({
  reducer: rootReducer,
});

describe("Zoom Component", () => {
  it("рендерит компонент Zoom с начальным значением", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Zoom />
      </Provider>
    );

    const zoomValue = getByText("100%");
    expect(zoomValue).toBeInTheDocument();
  });

  it("по клику на кнопку плюс увеличивает значение zoom", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Zoom />
      </Provider>
    );

    const increaseZoomButton = getByTestId("increase-zoom-button");
    fireEvent.click(increaseZoomButton);
    const zoomValue = getByText("105%");
    expect(zoomValue).toBeInTheDocument();
  });

  it("по клику на кнопку плюс уменьшает значение zoom", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Zoom />
      </Provider>
    );

    const decreaseZoomButton = getByTestId("decrease-zoom-button");
    fireEvent.click(decreaseZoomButton);

    const zoomValue = getByText("100%");
    expect(zoomValue).toBeInTheDocument();
  });
});
