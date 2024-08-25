import EmailSvg from '../../assets/svgs/email.svg'
import PhoneSvg from '../../assets/svgs/phone.svg'

export const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-image"
          />
          <div>
            <h1 className="profile-name">Somnath Sardar</h1>
            <p className="profile-title">Full Stack Developer</p>
            <ul className="profile-contact">
              <li>
                <img src={EmailSvg} />
                <span>john.doe@example.com</span>
              </li>
              <li>
                <img src={PhoneSvg} />
                <span>(123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="profile-content">
          <section className="profile-section section-sideby-side">
            <div>
              <h2>About Me</h2>
              <p>
                I'm a passionate Full Stack Developer with experience in
                creating dynamic web applications. I love working with React,
                TypeScript, Node.js, and building beautiful user interfaces.
              </p>
            </div>
            <div>
              <h2>Skills</h2>
              <ul className="profile-skills">
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>HTML & CSS</li>
                <li>SCSS</li>
              </ul>
            </div>
          </section>

          <section className="profile-section">
            <h2>Experience</h2>
            <div className="experience-item">
              <h3>
                Full stack developer at CodelogicX <p>(November 2021 - Present)</p>
              </h3>
              
              <p>
                Leading a team of developers in creating scalable web applications.
              </p>
            </div>
            <div className="experience-item">
              <h3>
                Software Engineer at Tech Wishes <p>(June 2019 - October 2021)</p>
              </h3>
              <p>
                Developed and maintained various web projects.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
