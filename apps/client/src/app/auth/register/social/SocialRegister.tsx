"use client";

import Text from "@/components/Text";
import clsx from "clsx";
import { useState } from "react";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { socialRegisterAction } from "@/app/actions/auth/register";
import { useRouter } from "next/navigation";

type SocialRegisterFormProps = {
  email: string;
  nickname: string;
};

export default function SocialRegisterForm({ email, nickname }: SocialRegisterFormProps) {
  const router = useRouter();

  const [registerBody, setRegisterBody] = useState({
    nickname: nickname || "",
    how: "",
  });

  const handleRegisterBodyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await socialRegisterAction(registerBody);
    if (response.success) {
      router.push("/auth/login");
    }
  };

  const isAvailableRegisterButton = registerBody.nickname;

  return (
    <main className={clsx("mt-[var(--header-height)] p-3 pt-[30px]", "flex flex-col gap-4")}>
      <Text as="h2" typography="display-lg">
        Register
      </Text>
      <form className="flex flex-col gap-3" onSubmit={handleRegisterSubmit}>
        <div className="flex flex-col gap-2">
          <Field>
            <Field.Label>Email</Field.Label>
            <Field.Input name="email" readOnly value={email} />
          </Field>
          <Field>
            <Field.Label>Nickname</Field.Label>
            <Field.Input
              name="nickname"
              placeholder="ex. 123456"
              value={registerBody.nickname}
              onChange={handleRegisterBodyChange}
            />
          </Field>
          <Field>
            <Field.Label>How did you find out about this page? (optional)</Field.Label>
            <Field.Input
              name="how"
              placeholder="e.g. reglish study, search engine, social media"
              value={registerBody.how}
              onChange={handleRegisterBodyChange}
            />
          </Field>
        </div>
        <Button disabled={!isAvailableRegisterButton}>Register</Button>
      </form>
    </main>
  );
}
