import { WritingDialogueType } from '@/types/dialogue';
import { stripHtmlTags } from '@/utils/content';

type ResultDialogueItemProps = WritingDialogueType;

function getHighlightedDifference(correct: string, userInput: string) {
  const correctWords = correct.split(' ');
  const userWords = userInput.split(' ');

  return correctWords.map((word, index) => {
    if (word !== userWords[index]) {
      return (
        <span key={index} className="text-red-500">
          {userWords[index] || '___'}
        </span>
      );
    }
    return (
      <span key={index} className="text-green-600">
        {word}{' '}
      </span>
    );
  });
}

export default function ResultDialogueItem({
  english_script,
  writing_script,
}: ResultDialogueItemProps) {
  const correctText = stripHtmlTags(english_script);
  const userText = stripHtmlTags(writing_script || '');

  const isCorrect = correctText === userText;

  return (
    <div className="border p-3 rounded-md shadow-md">
      <div className="text-gray-700">
        <strong>Expected:</strong> {correctText}
      </div>
      {writing_script && (
        <div className="mt-2">
          <strong>Your Answer:</strong> {getHighlightedDifference(correctText, userText)}
        </div>
      )}
      <div className="mt-2 font-semibold">
        {isCorrect ? (
          <span className="text-green-500">✅ Correct!</span>
        ) : (
          <span className="text-red-500">❌ Incorrect!</span>
        )}
      </div>
    </div>
  );
}
