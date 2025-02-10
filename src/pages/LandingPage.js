import { useEffect, useState } from 'react';
import '../css/landing.css'
import images from '../utils/images';
import axios from 'axios';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inViewSections, setInViewSections] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
  });

  const handleScroll = () => {
    const sections = ['scroll-section', 'scroll-section2', 'scroll-section3', 'scroll-section4'];
    const newInViewSections = { ...inViewSections };

    sections.forEach((section, index) => {
      const rect = document.getElementById(section).getBoundingClientRect();
      newInViewSections[`section${index + 1}`] = rect.top < window.innerHeight * 0.8 && rect.top + rect.height > 0;
    });

    setInViewSections(newInViewSections);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inViewSections]);

  const validate = async (event) => {
    event.preventDefault();
    const reg = /^([a-z0-9_]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;

    if (reg.test(email)) {
      setErrorMsg('');
      setIsSubmitting(true);

      try {
        const response = await axios.post('https://formspree.io/f/xyyawbze', {
          email: email,
          message: message,
        });

        if (response.status === 200) {
          alert('Your message has been sent!');
          setEmail('');
        } else {
          setErrorMsg('Failed to send the email. Please try again.');
        }
      } catch (error) {
        setErrorMsg('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrorMsg('Please enter a valid email address.');
    }
  };

  return(
    <>
      <section className='banner-stn'>
      <div className='bannrer-txt'>
        <div className="bolded-topic"><span className='span-txt'>Develop</span> your skills in a new & unique way</div>
        <div className='banner-description'>Explore a trasformative approach to skill development on our online learning platform.</div>
      </div>
      <div className='banner-outline'>
        <div className='banner-container'>
          <img src={images.banner} alt='landing-banner' />
        </div>
        <div className='txt-bot1'>50% OFF 😎</div>
        <div className='txt-bot2'>10+ Online Courses</div>
        <div className='txt-bot3'>Learn anywhere😁</div>
      </div>
      </section>
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
           <div id='scroll-section' className={`students-row1 ${inViewSections.section1 ? 'in-view':''}`}>
             <img className='red-stu red-stu1 left' src={images.stu1} alt='student'/>
             <img className='blue-stu blue-stu1 right' src={images.stu2} alt='student'/>
           </div>
           <div id='scroll-section' className={`students-row2 ${inViewSections.section1 ? 'in-view':''}`}>
             <img className='blue-stu blue-stu2 left' src={images.stu3} alt='student'/>
             <img className='red-stu red-stu2 right' src={images.stu4} alt='student'/>
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
                <img src={images.profile} alt='instructor'/>
                <div className='instructor-name'>P. Dantey</div>
              </div>
            </div>
          </div>
          <div className='course-card'>
            <div><img className='course-pic' src={images.card2}/></div>
            <div className='course-program'>
              <div className='program-type'>Financial</div>
              <div className='rating'>⭐4.8</div>
            </div>
            <div className='course-name'>Financial Accounting</div>
            <div className='instructor-stn'>
              <div className='course-price'>GHC 400</div>
              <div className='instructor'>
                <img src={images.profile} alt='instructor'/>
                <div className='instructor-name'>P. Dantey</div>
              </div>
            </div>
          </div>
          <div className='course-card'>
            <div><img className='course-pic' src={images.card3}/></div>
            <div className='course-program'>
              <div className='program-type'>Financial</div>
              <div className='rating'>⭐4.8</div>
            </div>
            <div className='course-name'>Financial Accounting</div>
            <div className='instructor-stn'>
              <div className='course-price'>GHC 400</div>
              <div className='instructor'>
                <img src={images.profile} alt='instructor'/>
                <div className='instructor-name'>P. Dantey</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='facilitators-stn'>
        <div className='fs-title'>Meet Our Expert Facilitators</div>
        <div className='fs-card-ctn'>
          <div className='fs-card'>
            <div className='fs-img-ctn'>
              <img className='lec1' src={images.lec1}/>
            </div>
            <div className='fs-name'>Dr. Prince Dantey</div>
            <div className='fs-bio-ctn'>
              <div className='fs-bio'>Department of Social Sciences</div>
              <div className='fs-location'><span className='location-icon'>📍</span>KNUST</div>
            </div>
          </div>
          <div className='fs-card'>
            <div className='fs-img-ctn'>
              <img src={images.lec3}/>
            </div>
            <div className='fs-name'>Dr. Prince Dantey</div>
            <div className='fs-bio-ctn'>
              <div className='fs-bio'>Department of Social Sciences</div>
              <div className='fs-location'><span className='location-icon'>📍</span>KNUST</div>
            </div>
          </div>
          <div className='fs-card'>
            <div className='fs-img-ctn'>
              <img src={images.lec4}/>
            </div>
            <div className='fs-name'>Dr. Prince Dantey</div>
            <div className='fs-bio-ctn'>
              <div className='fs-bio'>Department of Social Sciences</div>
              <div className='fs-location'><span className='location-icon'>📍</span>KNUST</div>
            </div>
          </div>
          <div className='fs-card'>
            <div className='fs-img-ctn'>
              <img className='lec2' src={images.lec2}/>
            </div>
            <div className='fs-name'>Dr. Prince Dantey</div>
            <div className='fs-bio-ctn'>
              <div className='fs-bio'>Department of Social Sciences</div>
              <div className='fs-location'><span className='location-icon'>📍</span>KNUST</div>
            </div>
          </div>
        </div>
      </section>
      <section className='testimonials'>
        <div className='tes-title'>Student's Testimonials</div>
        <div className='tes-description'>Here's what our students have to say about their transformative incoming experience stories, real growth.
          Discover firsthood the impact our courses have had on their lives.
        </div>
        <div className='tes-card-ctn'>
          <div id='scroll-section2' className={`tes-card ${inViewSections.section2 ? 'in-view2':''}`}>
            <div className='tes-stu-ctn'>
              <div className='tes-stu-img'><img src={images.stu1}/></div>
              <div className='tes-stu-bio'>
                <div className='tes-stu-name'>Obeng Gyebi</div>
                <div className='tes-stu-major'>Financial Management</div>
                <div className='tes-stu-star'>🌟🌟🌟🌟</div>
              </div>
            </div>
            <div className='tes-stu-message'>Enrolling courses at this elearning platform was a game-changer for me.
              Absolutely transformative experience!
            </div>
          </div>
          <div id='scroll-section3' className={`tes-card ${inViewSections.section3 ? 'in-view3':''}`}>
            <div className='tes-stu-ctn'>
              <div className='tes-stu-img'><img src={images.stu1}/></div>
              <div className='tes-stu-bio'>
                <div className='tes-stu-name'>Obeng Gyebi</div>
                <div className='tes-stu-major'>Financial Management</div>
                <div className='tes-stu-star'>🌟🌟🌟🌟</div>
              </div>
            </div>
            <div className='tes-stu-message'>Enrolling courses at this elearning platform was a game-changer for me.
              Absolutely transformative experience!
            </div>
          </div>
          <div id='scroll-section4' className={`tes-card ${inViewSections.section4 ? 'in-view3':''}`}>
            <div className='tes-stu-ctn'>
              <div className='tes-stu-img'><img src={images.stu1}/></div>
              <div className='tes-stu-bio'>
                <div className='tes-stu-name'>Obeng Gyebi</div>
                <div className='tes-stu-major'>Financial Management</div>
                <div className='tes-stu-star'>🌟🌟🌟🌟</div>
              </div>
            </div>
            <div className='tes-stu-message'>Enrolling courses at this elearning platform was a game-changer for me.
              Absolutely transformative experience!
            </div>
          </div>
        </div>
        <button className='tes-btn'>See All</button>

      </section>
      <section className="contact-stn">
        <div className="cs-content-ctn">
          <div className="cs-content-left">
            Have questions for us?
            <br />
            Feel free to put them in a chat
          </div>

          <div className="cs-content-right">
            <form id="getintouch-form" onSubmit={validate}>
              <div className="getintouch-form">
                <input
                  id="name"
                  className="input border"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  maxLength="30"
                  disabled={isSubmitting}
                  required
                />

                <input
                  id="email"
                  name="mail"
                  className="input border"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  disabled={isSubmitting}
                  required
                />

                <textarea
                  id="textarea"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  cols="30"
                  rows="5"
                  placeholder="Hello E-Learning. I would like to get in touch with you..."
                  disabled={isSubmitting}
                  required
                ></textarea>

                <button id="getintouch-btn" type="submit" className="getintouchbtn">
                  Get in touch
                </button>

                {errorMsg && <div id="error-msg">{errorMsg}</div>}
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </section>
    </>
    
  );
}