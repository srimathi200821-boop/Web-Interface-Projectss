import "./Skills.css";

function Skills() {

    const skills = [

        { name: "Java & OOP", level: 89 },

        { name: "Python", level: 85 },

        { name: "UI/UX Design", level: 85 },

        { name: "Web Technology (HTML/CSS/JS)", level: 90 },

        { name: "Object-Oriented Programming", level: 85 },

        { name: "Cyber Security Fundamentals", level: 75 },

    ];

    return (

        <section id="skills">

         <div className="skills-header">

          <span className="skills-label">SKILLS</span>

          <h2 className="skills-title">

           What I <span>Work With</span>

          </h2>

          <p className="skills-subtitle">

           A blend of programming fundamentals and an emerging focus on

           cyber security, web development, and interface design.

          </p>

         </div>

         <div className="skills-grid">

          {skills.map((skill, index) => (

           <div className="skill-card" key={index}>

            <div className="skill-top">

             <span>{skill.name}</span>





                <span>{skill.level}%</span>

            </div>

            <div className="progress-bar">

                <div

                 className="progress-fill"

                 style={{ width: `${skill.level}%` }}

                ></div>

            </div>

           </div>

          ))}

         </div>

         <p className="skills-note">

          Percentages are self-assessed proficiency levels and will continue

          to improve with experience and continuous learning.

         </p>

     </section>

    );

}

export default Skills;