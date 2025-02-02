const userId = "abc123"; // Get from Firebase Auth
const courseId = "course456"; // Get from the course data
const lessonId = "lesson789"; // Get from the lesson data
const googleFormBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd9xFj4Kwo0ULdzQtmcOFz3-iNhK1vsYQj5UikpnvZrrW_rFw/viewform";
export const prefilledUrl = `${googleFormBaseUrl}?usp=pp_url&entry.1399521153=${userId}&entry.393469018=${courseId}&entry.25946132=${lessonId}`;

const openQuizForm = () => {
  window.open(prefilledUrl, "_blank"); // Opens Google Form in a new tab
};

return <button onClick={openQuizForm}>Take Quiz</button>;
