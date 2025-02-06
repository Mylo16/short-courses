import { auth } from "./firebaseConfig";

// https://docs.google.com/forms/d/e/1FAIpQLSd9xFj4Kwo0ULdzQtmcOFz3-iNhK1vsYQj5UikpnvZrrW_rFw/viewform?usp=pp_url&entry.1399521153=USER_ID&entry.393469018=COURSE_ID&entry.25946132=LESSON_ID
export const openQuizForm = (googleFormBaseUrl, courseId, lesson ) => {
  const user = auth.currentUser;
  console.log(lesson);
  if (!user) {
    return;
  }
  const userId = user.uid;
  const prefilledUrl = `${googleFormBaseUrl}?usp=pp_url&entry.${lesson.entryMapping.userId}=${userId}&entry.${lesson.entryMapping.courseId}=${courseId}&entry.${lesson.entryMapping.lessonId}=${lesson.id}`;
  
  window.open(prefilledUrl, "_blank");
};