import { Text, Group, Flex, ScrollArea } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { IHistoryAction } from "entities/ActionItem";
import { ActionItem } from "entities/ActionItem";
import { toggleCanceledAction } from "../model/slice";

export function History() {
  const { history } = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();
  const handleOnClickAction = (action: IHistoryAction) => {
    dispatch(toggleCanceledAction(action));
  };

  return (
    <>
      <Group px="md" mb="xs" position="apart">
        <Text size="xs" weight={500} color="dimmed">
          История
        </Text>
      </Group>
      <ScrollArea m="xs" h={400} type="auto" offsetScrollbars scrollbarSize={8}>
        <Flex mb="xs" justify="center" align="flex-start" direction="column" wrap="wrap">
          {history.map((action: IHistoryAction) => (
            <ActionItem action={action} onClickAction={handleOnClickAction} />
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
}
