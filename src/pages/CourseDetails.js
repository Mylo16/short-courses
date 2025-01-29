import NavBar2 from "../components/NavBar2";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function CourseDetails() {
  return(
    <>
      <NavBar2 />
      <div style={{ height: "600px" }}>
        <Worker  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
          <Viewer fileUrl="/assets/ANTWI_ERIC_OPOKU_2993020.pdf" />
        </Worker>
      </div>
    </>
    
  );
}

export default CourseDetails;