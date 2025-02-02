import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where, doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

export const addCourse = async (courseName, programme, facilitatorId, coursePic, duration, numVideos, price) => {
  try {
    const courseRef = doc(collection(db, "courses"));
    await setDoc(courseRef, {
      course_name: courseName,
      facilitatorId: doc(db, "users", facilitatorId),
      course_pic: coursePic,
      duration,
      numVideos,
      lessons: [],
      quizzes: [],
      price,
      programme,
    });

    const facilitatorRef = doc(db, "users", facilitatorId);
    await updateDoc(facilitatorRef, {my_course: courseRef});

    return courseRef.id;
  } catch (error) {
    console.error("Error adding course:", error);
  }
};


export const addLesson = async (title, content, courseId) => {
  try {
    const lessonRef = doc(collection(db, "lessons"));
    await setDoc(lessonRef, {
      title,
      content,
      courseId: doc(db, "courses", courseId)
    });

    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, {
      lessons: arrayUnion(lessonRef)
    });

    return lessonRef.id;
  } catch (error) {
    console.error("Error adding lesson:", error);
  }
};

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const getFacilitators = async () => {
  try {
    const q = query(collection(db, "users"), where("role", "==", "facilitator"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    alert(error);
  }
}

export const getFacilitatorByCourse = async (courseId) => {
  try {
    const q = query(collection(db, "users"), where("my_course", "==", doc(db, "courses", courseId)));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    alert(error);
  }
};

export const getLessonsByCourse = async (courseId) => {
  try {
    const q = query(collection(db, "lessons"), where("courseId", "==", doc(db, "courses", courseId)));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    alert(error);
  }
};

export const getCourses = async () => {
  const coursesRef = collection(db, "courses");
  const coursesSnapshot = await getDocs(coursesRef);

  const courses = await Promise.all(
    coursesSnapshot.docs.map(async (courseDoc) => {
      const courseData = courseDoc.data();
      const facilitatorSnapshot = await getDoc(courseData.facilitatorId);

      let lessons = [];
      if (Array.isArray(courseData.lessons)) {
        lessons = await Promise.all(
          courseData.lessons.map(async (lessonRef) => {
            if (typeof lessonRef === "object") {
              const lessonSnapshot = await getDoc(lessonRef);
              return lessonSnapshot.exists() ? { id: lessonSnapshot.id, ...lessonSnapshot.data() } : null;
            }
            return null;
          })
        );
        lessons = lessons.filter((lesson) => lesson !== null); // Remove null values
      }

      return {
        id: courseDoc.id,
        ...courseData,
        lessons,
        facilitator: facilitatorSnapshot.exists() ? facilitatorSnapshot.data() : null,
      };
    })
  );

  return courses;
};

export const enrollUserInCourse = async (userId, courseId, lessons) => {
  const enrollmentRef = doc(db, "enrollments", `${userId}_${courseId}`);

  await setDoc(enrollmentRef, {
    userId,
    courseId,
    completedLessons: lessons.map((lesson) => ({
      lessonId: lesson.lessonId,
      quizPassed: false,
    })),
    progress: 0,
  });

};

const updateLessonProgress = async (userId, courseId, lessonId, passed) => {
  const enrollmentRef = doc(db, "enrollments", `${userId}_${courseId}`);
  const enrollmentSnap = await getDoc(enrollmentRef);

  if (enrollmentSnap.exists()) {
    const data = enrollmentSnap.data();

    // Update the corresponding lesson's quiz status
    const updatedLessons = data.completedLessons.map(lesson => {
      if (lesson.lessonId === lessonId) {
        lesson.quizPassed = passed;
      }
      return lesson;
    });

    const totalCompleted = updatedLessons.filter(lesson => lesson.quizPassed).length;
    const totalLessons = updatedLessons.length;
    const progress = Math.floor((totalCompleted / totalLessons) * 100);

    await updateDoc(enrollmentRef, {
      completedLessons: updatedLessons,
      progress: progress,
    });

  }
};