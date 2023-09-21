import { fireEvent, render } from "@testing-library/react";
import { EditableText } from "shared/EditableText";

describe("EditableText Component", () => {
  const onChange = jest.fn();
  const text = "Текст";
  it("рендерит компонент и текст", () => {
    const { getByText } = render(<EditableText handleChange={onChange} id="1" text={text} />);
    const textElement = getByText(text);
    expect(textElement).toBeInTheDocument();
  });

  it("по двойному клику переходит в режим редактирования", () => {
    const { getByText, getByTestId } = render(
      <EditableText handleChange={onChange} id="1" text={text} />
    );
    const textElement = getByText(text);
    fireEvent.doubleClick(textElement);
    const inputElement = getByTestId("editable-input");
    expect(inputElement).toBeInTheDocument();
  });

  it("выключает режим редактирования при потере фокуса", () => {
    const { getByText, getByTestId } = render(
      <EditableText handleChange={onChange} id="1" text={text} />
    );
    const textElement = getByText(text);
    fireEvent.doubleClick(textElement);
    const inputElement = getByTestId("editable-input");
    fireEvent.blur(inputElement);
    const spanElement = getByText(text);
    expect(spanElement).toBeInTheDocument();
  });

  test("вызывает функцию onChange при изменении input", () => {
    const { getByText, getByTestId } = render(
      <EditableText handleChange={onChange} id="1" text={text} />
    );
    const textElement = getByText(text);
    fireEvent.doubleClick(textElement);
    const inputElement = getByTestId("editable-input") as HTMLInputElement;
    const newText = "новый текст";
    fireEvent.change(inputElement, { target: { value: newText } });
    fireEvent.blur(inputElement);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
