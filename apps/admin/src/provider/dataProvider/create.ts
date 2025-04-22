import { CreateParams, CreateResult, DataProvider, RaRecord } from "react-admin";
import RESOURCE from "../../constants/resource";
import { dialogueApi, expressionApi, movieApi, sceneApi, speakerApi, studyApi } from "../../libs/api";
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

      // 발화자 생성
      const speakers = params.data.speakers as Speaker[];

      for (const speaker of speakers) {
        await speakerApi.speakerControllerCreateSpeaker({
          sceneId: scene.id,
          createSpeakerDto: {
            speakerName: speaker.speakerName,
            speakerType: speaker.speakerType,
          }
        });
      }

      const parsedContent = params.data.content
        ?.split('\n\n')
        .map((line: string) => {
          const [speakerName, englishScript, koreanScript] = line.split('\n');

          const speakerId = params.data.speakers?.find((speaker: Speaker) => speaker.speakerName === speakerName)?.id;

          const formattedEnglish = `<p>${englishScript.replace(/\*\*(.*?)\*\*/g, "<span class='keypoint'>$1</span>")}</p>`;
          const formattedKorean = `<p>${koreanScript}</p>`;

          return { speakerId, englishScript: formattedEnglish, koreanScript: formattedKorean };
        })

      for (const dialogue of parsedContent) {
        await dialogueApi.dialogueControllerCreateDialogue({
          speakerId: dialogue.speakerId,
          sceneId: scene.id,
          createDialogueDto: dialogue,
        })
      }
      return { data: scene } as unknown as CreateResult<RecordType>
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
        studiedAt: params.data.studiedAt,
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
