import "../blocks/main.css";
import heartlogo from "../assets/heart-logo.svg";
import redcloselogo from "../assets/red-close-logo.png";
import { Users, MessageCircle, Shield, Heart } from "lucide-react";


export default function Main({onClick}) {
  return (
    <main className="main">
      <h1 className="main__title">
        Meet amazing people in your area
      </h1>
      <p className="main__text">
        Online dating where you date people, not their profile. One monthly fee
        <span className="main__span">for unlimited events - often less than what others charge for a singles</span>
        day.
      </p>
      <button className="main__button" onClick={onClick}>Create Account</button>
      <section className="section1">
        <h3 className="section__title">We're Not a Speed Dating Service</h3>
        <p className="section1__text">
          Say goodbye to awkward 3-minute conversations and hello to natural<span className="main__span">
          connections through unrushed conversations</span>
        </p>
        <div className="section1__cards">
          <div className="section1__card">
            <img
              src={redcloselogo}
              alt="red-close-logo"
              className="section1__card-image"
            />
            <p className="section1__card-text section1__card-text_color_brown">
              Speed Dating
            </p>
            <ul className="section1__card-list">
              <li className="section1__card-item">
                Rushed 3-5 minute conversations with strangers
              </li>
              <li className="section1__card-item">
                Forced small talk in awkward sitting arrangements
              </li>
              <li className="section1__card-item">
                High pressure to make instant judgments
              </li>
              <li className="section1__card-item">
                Limited to surface-level conversations
              </li>
              <li className="section1__card-item">
                Expensive per-event pricing ($50-100+ each time)
              </li>
            </ul>
          </div>
          <div className="section1__card">
            <img
              src={heartlogo}
              alt="heart-logo"
              className="section1__card-image"
            />
            <p className="section1__card-text section1__card-text_color_pink">
              BaeQuest Events
            </p>
            <ul className="section1__card-list">
              <li className="section1__card-item">
                Natural conversations during fun activities & experiences
              </li>
              <li className="section1__card-item">
                Relaxed group settings with shared interests
              </li>
              <li className="section1__card-item">
                Authentic connections through unrushed conversations
              </li>
              <li className="section1__card-item">
                See how people really act in social situations
              </li>
              <li className="section1__card-item">
                Talk to anyone for as long as you like
              </li>
              <li className="section1__card-item">
                One affordable monthly fee for unlimited events
              </li>
            </ul>
          </div>
        </div>
        <p className="section1__highlight">
          <span className="section1__summary">Experience the difference: </span>
          Whether it's a coffee shop meetup, park stroll, cooking<br/> class, hiking
          group, art workshop, or game night - you'll discover genuine chemistry<br/>
          through unrushed conversations at comfortable, low-key locations.
        </p>
      </section>
      <section className="section2">
        <h3 className="section__title">How it works</h3>
        <p className="section2__text">
          Discover how our unique approach to dating brings people together
           <span className="section2__span">throughr real-world experiences</span>
        </p>
        <ol className="section2__list">
          <li className="section2__item">
            <p className="section2__list-header">Create Your Profile</p>
            <p className="section2__list-par">
              Sign up with your phone, email, or social accounts. Add photos and
              tell us about yourself.
            </p>
          </li>
          <li className="section2__item">
            {" "}
            <p className="section2__list-header">Browse Local Events</p>
            <p className="section2__list-par">
              Discover curated dating events happening near you - from coffee
              meetups to activity-based gatherings.
            </p>
          </li>
          <li className="section2__item">
            {" "}
            <p className="section2__list-header">Attend & Connect</p>
            <p className="section2__list-par">
              Show up to events, meet people face-to-face, and build genuine
              connections through shared experiences.
            </p>
          </li>
          <li className="section2__item">
            {" "}
            <p className="section2__list-header">Build Relationships</p>
            <p className="section2__list-par">
              Skip the endless texting phase and get to know people through
              unrushed conversations and activities.
            </p>
          </li>
        </ol>
        <video className="section2__video" width="840" height="360" controls>
          <source src="" type="video/mp4" />
          <source src="" type="video/webm" />
          <source src="" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <button onClick={onClick} className="main__button">Create Account</button>
      </section>
      <section className="section3">
        <h3 className="section__title">Why Choose BaeQuest?</h3>
        <p className="section3__text">
          Experience a better way to meet people through authentic connections
          and shared experiences
        </p>
        <div className="section3__benefit">
          <ul className="section3__cards">
            <li className="section3__card">
              <Users className="section3__card-image" />
              <p className="section3__card-title">Unbeatable Value</p>
              <p className="section3__card-par">
                One monthly subscription for unlimited events - less than what
                competitors charge per event
              </p>
            </li>
            <li className="section3__card">
              <Shield className="section3__card-image" />
              <p className="section3__card-title">Verified Events</p>
              <p className="section3__card-par">
                All events are hosted at verified, safe locations with real
                people
              </p>
            </li>
            <li className="section3__card">
              <MessageCircle className="section3__card-image" />
              <p className="section3__card-title">Face-to-Face Dating</p>
              <p className="section3__card-par">
                Skip the endless texting and meet in person at curated venues
                and events
              </p>
            </li>
            <li className="section3__card">
              <Heart className="section3__card-image" />
              <p className="section3__card-title">Authentic Connections</p>
              <p className="section3__card-par">
                Build genuine relationships through shared experiences and real
                conversations
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
