import React from 'react';
import images from '../utils/images';
import '../css/footer.css';

function Footer() {
  return(
    <footer className='footer'>
      <div className='ft-content-ctn'>
        <div className='ft-content-blk'>
          <div className='ft-content-title main'>E-Short Courses</div>
          <div>Explore a transformative<br/> approach to skill<br/> development on our<br/>online learning platform.</div>
          <div className='ft-social-ctn'>
            <img src={images.facebook}/>
            <img src={images.twitter}/>
            <img src={images.linkedin}/>
            <img src={images.youtube}/>
          </div>
        </div>
        <div className='ft-content-blk'>
          <div className='ft-content-title'>Centre</div>
          <a>About Us</a>
          <a>Services</a>
          <a>Community</a>
          <a>Testimonials</a>
        </div>
        <div className='ft-content-blk'>
          <div className='ft-content-title'>Quick Links</div>
          <a>Courses</a>
          <a>Become Teacher</a>
          <a>Services</a>
          <a>All in One</a>
        </div>
        <div className='ft-content-blk'>
          <div className='ft-content-title'>Contact Us</div>
          <div>+233206546917</div>
          <div>+233206546917</div>
          <div>+233206546917</div>
          <div>+233206546917</div>
        </div>
      </div>
      <div className='copyright'>Copyright ©️ 2025 E-Short Courses. All rights reserved</div>
    </footer>
  );
}

export default Footer;