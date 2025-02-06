import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";

export const addCourse = async (courseData) => {
  const { name, pic, duration, numVideos, price, description, facilitatorId, programme } = courseData;

  try {
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("course_name", "==", name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("A course with this name already exists. Please choose a different name.");
      return;
    }

    const courseRef = doc(collection(db, "courses"));
    await setDoc(courseRef, {
      course_name: name,
      facilitatorId: doc(db, "users", facilitatorId),
      course_pic: pic,
      duration,
      numVideos,
      lessons: [],
      price,
      course_description: description,
      programme,
    });

    alert("Course created successfully");
    await updateDoc(doc(db, "users", facilitatorId), { my_course: courseRef });
  } catch (error) {
    console.log("Error adding course:", error);
  }
};

export const addLesson = async (lessonData) => {
  const {title, content, quizUrl, courseId, mappingUserId, mappingCourseId, mappingLessonId} = lessonData;
  try {
    const lessonsRef = collection(db, "lessons");
    const q = query(lessonsRef, where("title", "==", title));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("Lesson already exists.");
      return;
    }

    const lessonRef = doc(collection(db, "lessons"));
    await setDoc(lessonRef, {
      title,
      content,
      courseId: doc(db, "courses", courseId),
      entryMapping: {courseId: mappingCourseId, lessonId: mappingLessonId, userId: mappingUserId },
      quizUrl,
    });

    await updateDoc(doc(db, "courses", courseId), {
      lessons: arrayUnion(lessonRef),
    });
    alert("Lesson created successfully");
    return lessonRef.id;
  } catch (error) {
    console.error("Error adding lesson:", error);
  }
};

export const getCollection = async (collectionName, filter = null) => {
  try {
    const colRef = filter ? query(collection(db, collectionName), filter) : collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
  }
};

export const getUsers = () => getCollection("users");

export const getFacilitators = () => getCollection("users", where("role", "==", "facilitator"));

export const getFacilitatorByCourse = (courseId) => getCollection("users", where("my_course", "==", doc(db, "courses", courseId)));

export const getLessonsByCourse = (courseId) => getCollection("lessons", where("courseId", "==", doc(db, "courses", courseId)));

export const fetchEnrolledCourses = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) throw new Error("User not found");

    const enrolledCourses = userDoc.data().enrolledCourses || [];

    const enrollmentDetails = (await getDocs(query(collection(db, "enrollments"), where("userId", "==", userId))))
      .docs.reduce((acc, doc) => {
        const data = doc.data();
        acc[data.courseId] = { progress: data.progress, completedLessons: data.completedLessons || [] };
        return acc;
      }, {});

    const coursesData = await Promise.all(
      enrolledCourses.map(async (courseRef) => {
        const courseDoc = await getDoc(courseRef);
        if (!courseDoc.exists()) return null;

        const courseData = courseDoc.data();
        const facilitatorData = (await getDoc(courseData.facilitatorId)).data();

        const lessons = await Promise.all(
          (courseData.lessons || []).map(async (lessonRef) => {
            const lessonDoc = await getDoc(lessonRef);
            return lessonDoc.exists() ? { id: lessonDoc.id, ...lessonDoc.data(), courseId: lessonDoc.data().courseId.id } : null;
          })
        );

        return {
          id: courseDoc.id,
          ...courseData,
          lessons,
          facilitatorId: courseData.facilitatorId.id,
          ...enrollmentDetails[courseDoc.id],
          facilitatorName: facilitatorData?.name,
          facilitatorImage: facilitatorData?.user_img,
        };
      })
    );

    return coursesData.filter(Boolean);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }
};

export const getCourseById = async (courseId) => {
  try {
    const courseDoc = await getDoc(doc(db, "courses", courseId));
    if (!courseDoc.exists()) throw new Error("Course not found");

    const courseData = courseDoc.data();
    const facilitatorData = (await getDoc(courseData.facilitatorId)).data();

    const lessons = await Promise.all(
      (courseData.lessons || []).map(async (lessonRef) => {
        const lessonDoc = await getDoc(lessonRef);
        return lessonDoc.exists() ? { id: lessonDoc.id, ...lessonDoc.data(), courseId: lessonDoc.data().courseId.id } : null;
      })
    );

    return {
      id: courseDoc.id,
      ...courseData,
      facilitatorId: courseData.facilitatorId.id,
      lessons: lessons.filter(Boolean),
      facilitator: {...facilitatorData, my_course: facilitatorData.my_course.id },
    };
  } catch (error) {
    console.error("Error fetching course by ID:", error);
  }
};

export const getCourses = async () => {
  try {
    const coursesSnapshot = await getDocs(collection(db, "courses"));

    const courses = await Promise.all(
      coursesSnapshot.docs.map(async (courseDoc) => {
        const courseData = courseDoc.data();
        const facilitatorData = (await getDoc(courseData.facilitatorId)).data();

        const lessons = await Promise.all(
          (courseData.lessons || []).map(async (lessonRef) => {
            const lessonDoc = await getDoc(lessonRef);
            return lessonDoc.exists() ? { id: lessonDoc.id, ...lessonDoc.data(), courseId: lessonDoc.data().courseId.id } : null;
          })
        );

        return {
          id: courseDoc.id,
          ...courseData,
          facilitatorId: courseData.facilitatorId.id,
          lessons: lessons.filter(Boolean),
          facilitator: { ...facilitatorData, my_course: facilitatorData.my_course.id },
        };
      })
    );

    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

export const enrollUserInCourse = async (userId, courseId) => {
  try {
    const enrollmentsRef = collection(db, "enrollments");
    const q = query(enrollmentsRef, where("id", "==", `${userId}_${courseId}`));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("User already enrolled in course.");
      return;
    }

    const lessonsQuery = query(collection(db, "lessons"), where("courseId", "==", courseId));
    const lessonsSnapshot = await getDocs(lessonsQuery);

    const lessonsData = lessonsSnapshot.docs.map((doc) => ({
      lessonId: doc.id, 
      quizPassed: false,
      score: 0,
    }));

    const enrollmentRef = doc(db, "enrollments", `${userId}_${courseId}`);
    await setDoc(enrollmentRef, {
      userId,
      courseId,
      completedLessons: lessonsData, 
      progress: 0,
    });

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(courseId),
    });

    alert("User enrolled in course successfully.");
  } catch (error) {
    console.error("Error enrolling user:", error);
  }
};


export const addEvent = async (eventData) => {
  const { title, description, eventDate, startTime, endTime, courseId } = eventData;

  try {
    const eventRef = collection(db, "events");
    const courseData = (await getDoc(collection(db, "courses", courseId))).data();
    const facilitatorData = (await getDoc(query(collection(db, "users"), where("my_course", "==", doc(db, "courses", courseId))))).data();
    await addDoc(eventRef, {
      title,
      description,
      startTime: Timestamp.fromDate(new Date(startTime)),
      endTime: Timestamp.fromDate(new Date(endTime)),
      eventDate: Timestamp.fromDate(new Date(eventDate)),
      facilitatorName: facilitatorData.name,
      courseId: doc(db, "courses", courseId),
      courseName: courseData.title,
    });

    alert("Event created successfully!");
  } catch (error) {
    console.error("Error creating event:", error);
    alert("Error creating event. Please try again.");
  }
};

export const getStudentEvents = async (studentId) => {
  try {
    const userDocRef = doc(db, "users", studentId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      alert("User not found");
      return [];
    }

    const enrolledCourses = userDoc.data().enrolledCourses;

    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("courseId", "in", enrolledCourses));

    const querySnapshot = await getDocs(q);

    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getEventsForDate = async (date, studentId) => {
  try {
    const userDocRef = doc(db, "users", studentId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      alert("User not found");
      return [];
    }

    const enrolledCourses = userDoc.data().enrolledCourses;

    const eventsRef = collection(db, "events");
    const q = query(eventsRef,
      where("courseId", "in", enrolledCourses),
      where("eventDate", "==", date)
    );

    const querySnapshot = await getDocs(q);

    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const deleteCourseEvent = async (eventId) => {
  try {
    const eventRef = doc(db, "events", eventId);

    await deleteDoc(eventRef);
    alert("Event deleted successfully!");

    return eventId;
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("Error deleting event. Please try again.");
  }
};
