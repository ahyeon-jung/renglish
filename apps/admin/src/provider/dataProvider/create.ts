import { CreateParams, CreateResult, DataProvider, RaRecord } from "react-admin";
import RESOURCE from "../../constants/resource";
import { dialogueApi, expressionApi, movieApi, sceneApi, speakerApi } from "../../libs/api";
import { getGoogleDriveUrl } from "../../constants/url";
import { ExtendedSceneDto, Speaker } from "@renglish/services";

const create: DataProvider['create'] = async <RecordType extends RaRecord>(resource: string, params: CreateParams<RecordType>) => {
  if (resource === RESOURCE.MOVIES) {
    if (!params.data.title || !params.data.category || !params.data.imageUrl || !params.data.description) {
      return Promise.reject('Missing required fields');
    }

    const imageUrl = params.data.imageUrl.startsWith('https://lh3.googleusercontent.com/d/') ? params.data.imageUrl : getGoogleDriveUrl(params.data.imageUrl);

    const data = await movieApi.movieControllerCreate({
      createMovieDto: {
        title: params.data.title,
        category: params.data.category,
        imageUrl,
        description: params.data.description,
      }
    })

    return { data } as unknown as CreateResult<RecordType>
  }

  if (resource === RESOURCE.SCENES) {
    if (!params.data.content || !params.data.speakers || !params.data.title || !params.data.audioUrl || !params.data.description || !params.data.movieId) {
      return Promise.reject('Missing required fields');
    }

    try {
      // 장면 생성
      const scene = await sceneApi.sceneControllerCreateScene({
        movieId: params.data.movieId,
        createSceneDto: {
          title: params.data.title,
          audioUrl: params.data.audioUrl,
          description: params.data.description
        }
      }) as unknown as ExtendedSceneDto


      return { data: scene } as unknown as CreateResult<RecordType>
    } catch { }
  }

  if (resource === RESOURCE.SPEAKERS) {
    if (params.data.speakers?.length !== 0 || !params.data.sceneId) {
      return Promise.reject('Missing required fields');
    }

    try {
      const speakers = params.data.speakers as Speaker[];

      for (const speaker of speakers) {
        await speakerApi.speakerControllerCreateSpeaker({
          sceneId: params.data.sceneId,
          createSpeakerDto: {
            speakerName: speaker.speakerName,
            speakerType: speaker.speakerType,
          }
        });
      }
      return { data: {} } as unknown as CreateResult<RecordType>
    } catch { }
  }

  if (resource === RESOURCE.DIALOGUES) {
    if (!params.data.dialogues || !params.data.sceneId) {
      return Promise.reject('Missing required fields');
    }

    try {
      const dialogues = params.data.dialogues as { speakerId: string, korean_script: string; english_script: string }[];

      for (const [index, dialogue] of dialogues.entries()) {
        const formattedEnglish = `<p>${dialogue.english_script.replace(/\*\*(.*?)\*\*/g, "<span class='keypoint'>$1</span>")}</p>`;
        const formattedKorean = `<p>${dialogue.korean_script}</p>`;

        await dialogueApi.dialogueControllerCreateDialogue({
          speakerId: dialogue.speakerId,
          sceneId: params.data.sceneId,
          createDialogueDto: {
            englishScript: formattedEnglish,
            koreanScript: formattedKorean,
            order: index
          },
        })
      }

      return { data: {} } as unknown as CreateResult<RecordType>
    } catch { }
  }



  if (resource === RESOURCE.STUDIES) {
    if (!params.data.title || !params.data.description || !params.data.sceneId || !params.data.studiedAt) {
      return Promise.reject('Missing required fields');
    }

    const data = await sceneApi.sceneControllerCreate({
      sceneId: params.data.sceneId,
      createStudyDto: {
        title: params.data.title,
        description: params.data.description,
        studiedAt: new Date(params.data.studiedAt),
      }
    })

    return { data } as unknown as CreateResult<RecordType>
  }

  if (resource === RESOURCE.EXPRESSIONS) {
    if (!params.data.sceneId || !params.data.expression || !params.data.meaning || !params.data.usage || !params.data.examples) {
      return Promise.reject('Missing required fields');
    }
    const data = await expressionApi.expressionControllerCreate({
      sceneId: params.data.sceneId,
      createExpressionDto: {
        expression: params.data.expression,
        meaning: params.data.meaning,
        usage: params.data.usage,
        examples: params.data.examples,
      }
    })

    return { data } as unknown as CreateResult<RecordType>
  }
  return Promise.reject(`Unknown resource: ${resource}`);
}

export default create;
