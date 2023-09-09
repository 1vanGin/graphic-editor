import { useViewportSize } from "@mantine/hooks";
import { Center, Loader as MantineLoader } from "@mantine/core";

export const Loader = () => {
  const { height } = useViewportSize();
  return (
    <Center maw={400} h={height} mx="auto">
      <MantineLoader variant="dots" />
    </Center>
  );
};
