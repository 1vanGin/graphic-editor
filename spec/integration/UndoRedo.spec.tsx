import { fireEvent, render } from "@testing-library/react";
import { UndoRedo } from "entities/UndoRedo";

describe("UndoRedo Component", () => {
  it("рендерит компонент и левую и правую кнопку", () => {
    const onLeftBtnClick = jest.fn();
    const onRightBtnClick = jest.fn();
    const { getByTestId } = render(
      <UndoRedo onLeftBtnClick={onLeftBtnClick} onRightBtnClick={onRightBtnClick} />
    );

    const leftButton = getByTestId("undo-button");
    const rightButton = getByTestId("redo-button");

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it("по клику на левую кнопку вызывается функция onLeftBtnClick", () => {
    const onLeftBtnClick = jest.fn();
    const onRightBtnClick = jest.fn();
    const { getByTestId } = render(
      <UndoRedo onLeftBtnClick={onLeftBtnClick} onRightBtnClick={onRightBtnClick} />
    );

    const leftButton = getByTestId("undo-button");
    fireEvent.click(leftButton);

    expect(onLeftBtnClick).toHaveBeenCalledTimes(1);
    expect(onRightBtnClick).not.toHaveBeenCalled();
  });

  it("по клику на правую кнопку вызывается функция onRightBtnClick", () => {
    const onLeftBtnClick = jest.fn();
    const onRightBtnClick = jest.fn();

    const { getByTestId } = render(
      <UndoRedo onLeftBtnClick={onLeftBtnClick} onRightBtnClick={onRightBtnClick} />
    );

    const rightButton = getByTestId("redo-button");
    fireEvent.click(rightButton);

    expect(onRightBtnClick).toHaveBeenCalledTimes(1);
    expect(onLeftBtnClick).not.toHaveBeenCalled();
  });
});
