import {
  Create,
  SimpleForm,
  useCreate,
  useGetList,
  useNotify,
  useRedirect,
} from "react-admin";
import {
  Typography,
  TextField,
  Box,
  Stack,
  IconButton,
  Button,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState } from "react";
import RESOURCE from "../../constants/resource";

export const ExpressionCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();

  const [sceneId, setSceneId] = useState("");
  const [expressions, setExpressions] = useState([
    { expression: "", meaning: "", usage: "" },
  ]);

  const { data: scenes } = useGetList(RESOURCE.SCENES);

  const handleChange = (index: number, field: keyof typeof expressions[number], value: string) => {
    const newExpressions = [...expressions];
    newExpressions[index][field] = value;
    setExpressions(newExpressions);
  };

  const handleAdd = () => {
    setExpressions([...expressions, { expression: "", meaning: "", usage: "" }]);
  };

  const handleRemove = (index: number) => {
    setExpressions(expressions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!sceneId) {
      notify("씬을 선택해주세요", { type: "warning" });
      return;
    }

    try {
      await Promise.all(
        expressions.map((item) =>
          create(RESOURCE.EXPRESSIONS, {
            data: { sceneId, ...item },
          })
        )
      );
      notify("✅ Expressions created");
      redirect("/expressions");
    } catch (e) {
      notify("❌ 저장 실패", { type: "error" });
    }
  };

  return (
    <Create>
      <SimpleForm onSubmit={handleSubmit} >
        <Typography variant="h6" gutterBottom>
          여러 표현 등록하기
        </Typography>

        <TextField
          select
          fullWidth
          label="Scene"
          value={sceneId}
          onChange={(e) => setSceneId(e.target.value)}
        >
          <MenuItem value="">씬을 선택하세요</MenuItem>
          {scenes?.map((scene) => (
            <MenuItem key={scene.id} value={scene.id}>
              {scene.title}
            </MenuItem>
          ))}
        </TextField>

        <Stack spacing={2} mt={2} width="100%">
          {expressions.map((item, index) => (
            <Box key={index} display="flex" gap={2}>
              <Stack spacing={1} flexGrow={1}>
                <TextField
                  fullWidth
                  label="Expression"
                  value={item.expression}
                  onChange={(e) =>
                    handleChange(index, "expression", e.target.value)
                  }
                />
                <TextField
                  fullWidth
                  multiline
                  label="Meaning"
                  value={item.meaning}
                  onChange={(e) =>
                    handleChange(index, "meaning", e.target.value)
                  }
                />
                <TextField
                  fullWidth
                  multiline
                  label="Usage"
                  value={item.usage}
                  onChange={(e) =>
                    handleChange(index, "usage", e.target.value)
                  }
                />
              </Stack>
              <IconButton onClick={() => handleRemove(index)} sx={{ mt: 1 }}>
                <RemoveCircleIcon color="error" />
              </IconButton>
            </Box>
          ))}
          <Button onClick={handleAdd} startIcon={<AddCircleIcon />}>
            표현 추가
          </Button>
        </Stack>

        <Box mt={3}>
          <Button variant="contained" onClick={handleSubmit}>
            저장하기
          </Button>
        </Box>
      </SimpleForm>
    </Create>
  );
};

export default ExpressionCreate;
