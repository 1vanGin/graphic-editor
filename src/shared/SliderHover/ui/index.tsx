import { Slider } from "@mantine/core";
import { useHover } from "@mantine/hooks";

type SliderHoverProps = {
  value: number;
  onChange: (value: number) => void;
};

export function SliderHover({ value, onChange }: SliderHoverProps) {
  const { hovered, ref } = useHover();

  return (
    <Slider
      data-testid="layers-slider"
      min={0}
      max={100}
      ref={ref}
      label={null}
      styles={{
        thumb: {
          transition: "opacity 150ms ease",
          opacity: hovered ? 1 : 0,
        },

        dragging: {
          opacity: 1,
        },
      }}
      value={value}
      onChange={onChange}
    />
  );
}
