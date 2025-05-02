import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  useNotify,
  useRedirect,
  useCreate,
} from "react-admin";
import { MenuItem, Typography } from "@mui/material";
import RESOURCE from "../../constants/resource";
import { useGetList } from "react-admin";

export const ExpressionCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();
  const { data: scenes } = useGetList(RESOURCE.SCENES);

  const handleSubmit = async (values: any) => {
    const { sceneId, expressions } = values;

    if (!sceneId) {
      notify("씬을 선택해주세요", { type: "warning" });
      return;
    }

    try {
      await Promise.all(
        expressions.map((expr: any) =>
          create(RESOURCE.EXPRESSIONS, {
            data: {
              ...expr,
              sceneId,
            },
          })
        )
      );

      notify("✅ Expressions created");
      redirect("/expressions");
    } catch (err) {
      console.error(err);
      notify("❌ 저장 실패", { type: "error" });
    }
  };

  return (
    <Create>
      <SimpleForm onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          여러 표현 등록하기
        </Typography>

        <TextInput source="sceneId" label="Scene" select fullWidth>
          <MenuItem value="">씬을 선택하세요</MenuItem>
          {scenes?.map((scene) => (
            <MenuItem key={scene.id} value={scene.id}>
              {scene.title}
            </MenuItem>
          ))}
        </TextInput>

        <ArrayInput source="expressions" label="표현들">
          <SimpleFormIterator>
            <TextInput source="expression" label="Expression" fullWidth />
            <TextInput source="meaning" label="Meaning" fullWidth multiline />
            <TextInput source="usage" label="Usage" fullWidth multiline />
            <ArrayInput source="examples" label="예문">
              <SimpleFormIterator>
                <TextInput source="en" label="English" fullWidth />
                <TextInput source="ko" label="Korean" fullWidth />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default ExpressionCreate;
