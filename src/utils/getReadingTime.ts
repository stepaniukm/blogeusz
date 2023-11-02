const AVERAGE_READING_VELOCITY = 200; // words per minute

export const getReadingTime = (text: string) => {
  const wordCount = text.split(/\s/g).length;
  const readingTime = Math.ceil(wordCount / AVERAGE_READING_VELOCITY);

  return readingTime;
};
