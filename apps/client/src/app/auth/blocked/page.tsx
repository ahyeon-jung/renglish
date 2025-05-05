import Text from "@/components/Text";
import AuthContainer from "../_components/AuthContainer";

export default function Blocked() {
  return (
    <AuthContainer title="Blocked">
      <div>
        <Text as="h2" typography="display-lg">
          Sorry, this account is blocked
        </Text>
        <Text as="p" typography="body-lg">
          Please contact other account
        </Text>
      </div>
    </AuthContainer>
  );
}
