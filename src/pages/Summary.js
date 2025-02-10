import { useRef, useState } from "react";
import NavBar2 from "../components/NavBar2";
import '../css/summary.css';
import images from "../utils/images";

export default function Summary() {
  const tableHeaderRef = useRef(null);
  const tableBodyRef = useRef(null);
  const quizSummary = useState([]);

  const syncScroll = (source, target) => {
    target.current.scrollLeft = source.current.scrollLeft;
  };

  return(
    <>
      <NavBar2 />
      <div className="summary-ctn">
        <section className="sum-quiz-stn">
          <div className="sum-title">Quizzes Summary</div>
          <div className="table-container">
            <div ref={tableHeaderRef} onScroll={() => syncScroll(tableHeaderRef, tableBodyRef)} className='table-header'>
            <img className='table-banner1' src={images.tableBanner} alt='table-banner'/>
            <table>
            <thead>
              <tr>
                <th className='table-date'>Date</th>
                <th className='item'>Item</th>
                <th>Quantity</th>
                <th>Qnty Left</th>
              </tr>
            </thead>
            </table>
            </div>
            <div ref={tableBodyRef} onScroll={() => syncScroll(tableBodyRef, tableHeaderRef)} className='table-body'>
            <table>
            <tbody>
              {quizSummary.length > 0 ? (
                <>
                  {quizSummary.map((item, index) => (
                    <tr key={index}>
                      <td className='table-date'>{}</td>
                      <td className='item'>{item.name}</td>
                      <td>{Number(item.itemsBought)}</td>
                      <td>{Number(item.balance || item.itemsBought)}</td>
                    </tr>
                  ))}
                </>
              ):(<div className='no-items'><img src={images.addPic}/></div>)}
            </tbody>
            </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}