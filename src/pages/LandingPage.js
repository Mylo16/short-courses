import '../css/landing.css'
import images from '../utils/images';

export default function LandingPage() {
  return(
    <>
      <div className="bolded-topic"><span className='span-txt'>Develop</span> your skills in a new & unique way</div>
      <div className='banner-description'>Explore a trasformative approach to skill development on our online learning platform.</div>
      <div className='banner-outline'>
        <div className='banner-container'>
          <img src={images.banner} alt='landing-banner' />
        </div>
        <div className='txt-bot1'>50% OFF 😎</div>
        <div className='txt-bot2'>10+ Online Courses</div>
        <div className='txt-bot3'>Learn anywhere😁</div>
      </div>
      <div className='banner-btns'>
        <button className='enroll-btn'>Enroll Now</button>
        <button className='free-btn'>Free Trial</button>
      </div>

      <section className='search-courses'>
        <div className='logo-strike'>
          <img className='strike-mob' src={images.logo2}/>
          <img className='strike-mob' src={images.logo2}/>
          <img className='strike-mob' src={images.logo2}/>
          <img className='strike-pc' src={images.logo2}/>
          <img className='strike-pc' src={images.logo2}/>
        </div>
        <div className='search-title'>Search Courses</div>
        <div className='search-field'>
          <input className='search-input' placeholder='Search' />
          <div className='search-btn'><img src={images.search} /></div>
        </div>
        <div className='gallery-view'>
          <div className='students'>
           <div className='students-row1'>
             <img className='red-stu red-stu1' src={images.stu1} alt='student'/>
             <img className='blue-stu' src={images.stu2} alt='student'/>
           </div>
           <div className='students-row2'>
             <img className='blue-stu' src={images.stu3} alt='student'/>
             <img className='red-stu red-stu2' src={images.stu4} alt='student'/>
           </div>
          </div>
          <div className='gallery-txt'>
            <div className='gallery-txt-title'>Take Away</div>
            <div className='take-away-blk'>
              <div className='take-away-icon'><img src={images.certificate} /></div>
              <div>
                <div className='blk-header'>Earn a Certificate</div>
                <div className='blk-txt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</div>
              </div>
            </div>
            <div className='take-away-blk'>
              <div className='take-away-icon'><img src={images.expert} /></div>
              <div>
                <div className='blk-header'>Facilitation from Experts</div>
                <div className='blk-txt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</div>
              </div>
            </div>
            <div className='take-away-blk'>
              <div className='take-away-icon'><img src={images.proficiency} /></div>
              <div>
                <div className='blk-header'>Online Learning Proficiency</div>
                <div className='blk-txt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</div>
              </div>
            </div>
            <div className='take-away-blk'>
              <div className='take-away-icon'><img src={images.webinar} /></div>
              <div>
                <div className='blk-header'>Webinar Sessions</div>
                <div className='blk-txt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='popular-courses-ctn'>
        <div className='pc-title'>Popular Courses</div>
        <div className='pc-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</div>
        <div className='course-card-ctn'>
          <div className='course-card'>
            <div><img className='course-pic' src={images.card1}/></div>
            <div className='course-program'>
              <div className='program-type'>Financial</div>
              <div className='rating'>⭐4.8</div>
            </div>
            <div className='course-name'>Financial Accounting</div>
            <div className='instructor-stn'>
              <div className='course-price'>GHC 400</div>
              <div className='instructor'>
                <img src={images.instructor1} alt='instructor'/>
                <div className='instructor-name'>P. Dantey</div>
              </div>
            </div>
          </div>
          <div className='course-card'>
            <div><img className='course-pic' src={images.card1}/></div>
            <div className='course-program'>
              <div className='program-type'>Financial</div>
              <div className='rating'>⭐4.8</div>
            </div>
            <div className='course-name'>Financial Accounting</div>
            <div className='instructor-stn'>
              <div className='course-price'>GHC 400</div>
              <div className='instructor'>
                <img src={images.instructor1} alt='instructor'/>
                <div className='instructor-name'>P. Dantey</div>
              </div>
            </div>
          </div>
          <div className='course-card'>
            <div><img className='course-pic' src={images.card1}/></div>
            <div className='course-program'>
              <div className='program-type'>Financial</div>
              <div className='rating'>⭐4.8</div>
            </div>
            <div className='course-name'>Financial Accounting</div>
            <div className='instructor-stn'>
              <div className='course-price'>GHC 400</div>
              <div className='instructor'>
                <img src={images.instructor1} alt='instructor'/>
                <div className='instructor-name'>P. Dantey</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    
  );
}