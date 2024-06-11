import { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
      <Text as="p" color="red" size="2">
        {children}
      </Text>
  );
};

export default ErrorMessage;
