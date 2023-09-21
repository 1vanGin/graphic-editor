import "./style.css";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Notification as MantineNotification, rem } from "@mantine/core";

interface NotificationProps {
  color: string;
  children: string;
  title: string;
  isError?: boolean;
}

export const Notification = ({
  color,
  title,
  children,
  isError = false,
}: NotificationProps) => {
  const errorIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const okIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  return (
    <MantineNotification
      icon={!isError ? okIcon : errorIcon}
      color={color}
      title={title}
      mt="md"
    >
      {children}
    </MantineNotification>
  );
};
