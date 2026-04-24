import { downloadDefaultResume } from '../utils/downloadResume';
import { Logo } from '../components';

const Profile = () => {
  return (
    <div className="container mx-auto p-5">
      {/* Download Resume Button - Top Right */}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadDefaultResume}
          className="inline-flex items-center text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-base shadow-lg"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Resume
        </button>
      </div>

      <div className="md:flex no-wrap md:-mx-2">
        {/* Left Side */}
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white dark:bg-gray-800 p-3 border-t-4 border-purple-400">
            <div className="my-2 flex justify-center">
              <Logo width="80" height="80" />
            </div>
            <h1 className="text-gray-900 dark:text-white font-bold text-xl leading-8 my-1 text-center">
              Vikash Maskhare
            </h1>
            <h3 className="text-gray-600 dark:text-gray-300 mb-6 font-lg text-semibold leading-6 text-center">
              Associate Software Engineer - I
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-600 leading-6">
              Experienced Software Engineer with over 3+ years of experience in building user-friendly interfaces.
              Proficient in various front-end technologies, I specialize in turning design concepts into interactive
              web applications. Dedicated to keeping up with industry trends, I am passionate about innovative
              web development and excel at collaborating within dynamic teams.
            </p>
            <ul className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3">
                <span>Experience</span>
                <span className="ml-auto">3+ years</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 p-3 mt-4">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white leading-8 mb-3">
              <span className="tracking-wide">Contact Information</span>
            </div>
            <ul className="list-inside text-sm">
              <li className="py-2">
                <span className="font-semibold">Phone:</span> 9752004079
              </li>
              <li className="py-2">
                <span className="font-semibold">Email:</span>{" "}
                <a className="text-blue-600 dark:text-blue-400" href="mailto:vikashmaskhare95@gmail.com">
                  vikashmaskhare95@gmail.com
                </a>
              </li>
              <li className="py-2">
                <span className="font-semibold">Location:</span> Bhopal, Madhya Pradesh
              </li>
              <li className="py-2">
                <span className="font-semibold">LinkedIn:</span>{" "}
                <a
                  className="text-blue-600 dark:text-blue-400 break-all"
                  href="https://www.linkedin.com/in/vikash-maskhare-3b1397209/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/vikash-maskhare
                </a>
              </li>
              <li className="py-2">
                <span className="font-semibold">GitHub:</span>{" "}
                <a
                  className="text-blue-600 dark:text-blue-400"
                  href="https://github.com/CodeMaverickVikash/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CodeMaverickVikash
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-9/12 mx-2">
          {/* Summary Section */}
          <div className="bg-white dark:bg-gray-800 p-3 shadow-sm rounded-sm mb-4">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white leading-8 mb-3">
              <span className="text-blue-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">Vikash</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">Maskhare</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Gender</div>
                  <div className="px-4 py-2">Male</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">9752004079</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800 dark:text-blue-400" href="mailto:vikashmaskhare95@gmail.com">
                      vikashmaskhare95@gmail.com
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Birthday</div>
                  <div className="px-4 py-2">23 May 2000</div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Experience Section */}
          <div className="bg-white dark:bg-gray-800 p-3 shadow-sm rounded-sm mb-4">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white leading-8 mb-3">
              <span className="text-blue-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Professional Experience</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Asite Solutions Pvt Ltd</h3>
                    <p className="text-sm font-medium">Associate Software Engineer - I</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Ahmedabad</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2022 - Present | 3+ years</p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                  <li><strong>UI Development:</strong> Designed and developed user interfaces for web applications, ensuring a seamless and engaging user experience across multiple platforms.</li>
                  <li><strong>Front-End Technologies:</strong> Utilized HTML, CSS, JavaScript, TypeScript and frameworks like Angular and Angular to build responsive and interactive web components.</li>
                  <li><strong>Collaboration:</strong> Worked closely with UX designers, backend developers, and product managers to translate design mockups and wireframes into functional front-end code.</li>
                  <li><strong>Code Optimization:</strong> Implemented best practices for code efficiency and performance, leading to faster load times and improved user satisfaction.</li>
                  <li><strong>Testing and Debugging:</strong> Conducted thorough testing and debugging of UI components to ensure cross-browser compatibility and responsiveness.</li>
                  <li><strong>Version Control:</strong> Managed code versions using Git, coordinating with the team through pull requests and code reviews to maintain high code quality.</li>
                  <li><strong>Agile Methodologies:</strong> Participated in Agile development processes, including sprint planning, daily stand-ups, and retrospectives, to ensure timely delivery of features.</li>
                  <li><strong>Documentation:</strong> Created and maintained comprehensive documentation for UI components and development processes to support team collaboration and future maintenance.</li>
                  <li><strong>Bug and Feature fixes:</strong> Many development and bug-fixing tasks were successfully finished, and Angular 11 to 17 was upgraded, which enhanced platform performance and allowed developers to utilize the new Angular feature.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Skills Section */}
          <div className="bg-white dark:bg-gray-800 p-3 shadow-sm rounded-sm mb-4">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white leading-8 mb-3">
              <span className="text-blue-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Technical Skills</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Languages:</p>
                  <p>JavaScript, TypeScript, HTML, CSS, SCSS</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Frameworks:</p>
                  <p>Angular, React.js, Node.js, Angular.js</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Database:</p>
                  <p>Familiar with MongoDB</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Libraries:</p>
                  <p>Like jQuery for DOM manipulation, Lodash</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Styling Framework:</p>
                  <p>Bootstrap, Tailwindcss</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Component library:</p>
                  <p>Angular material, Angular, and React powered bootstrap</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Build Tools:</p>
                  <p>Familiarity with tools like Gulp, Webpack or Babel</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Industry knowledge:</p>
                  <p>Git, Jira, Bitbucket, SourceTree, Github, Debugging front-end code, dev tools, Local override</p>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="bg-white dark:bg-gray-800 p-3 shadow-sm rounded-sm mb-4">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white leading-8 mb-3">
              <span className="text-blue-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Soft Skills</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">✦</span> Problem Solving
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span> Decision Making
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span> Teamwork
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span> Quick Grasping
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span> Self Confidence
                </li>
              </ul>
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white dark:bg-gray-800 p-3 shadow-sm rounded-sm mb-4">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white leading-8 mb-3">
              <span className="text-blue-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Projects</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 space-y-4">
              {/* OrganizeSwift */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">OrganizeSwift</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>OrganizeSwift is a web application designed to streamline task management and enhance productivity. Leveraging a modern tech stack, the platform provides a user-friendly interface for creating, editing and organizing tasks seamlessly.</li>
                  <li>Implemented features such as add, update, edit, delete, and organize tasks.</li>
                  <li><strong>Skills and Technologies Used:</strong> Angular · TypeScript · Node.js · ng-bootstrap · scss · Angular Material · Bootstrap · HTML</li>
                </ul>
              </div>

              {/* InstantNotes */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">InstantNotes</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>This Note Taking App is built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a simple and efficient way to take and manage notes, making it easy to stay organized and focused.</li>
                  <li><strong>Skills and Technologies Used:</strong> JavaScript · Node.js · React.js · MongoDB · JSON Web Token (JWT) · Express.js · mongoose · express-validator · bcrypt · Bootstrap · HTML · Cascading Style Sheets (CSS)</li>
                </ul>
              </div>

              {/* CodingForum */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg mb-2">CodingForum - Question and Answer Website</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Developed a comprehensive Question and Answer website using JavaScript · jQuery · MySQL · Bootstrap · XAMPP · HTML · Cascading Style Sheets (CSS) · PHP.</li>
                  <li>Implemented user authentication, real-time updates, and a responsive design for seamless user interaction.</li>
                  <li>Facilitated discussions and knowledge sharing within the coding community.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white dark:bg-gray-800 p-3 shadow-sm rounded-sm mb-4">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white leading-8 mb-3">
              <span className="text-blue-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    fill="#fff"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Education</span>
            </div>
            <ul className="list-inside space-y-3 text-sm">
              <li>
                <div className="flex justify-between">
                  <div>
                    <div className="text-teal-600 dark:text-teal-400 font-semibold">Bachelor of Technology - BTech (Computer Science)</div>
                    <div className="text-gray-600 dark:text-gray-400">Trinity Institute of Technology & Research, Bhopal</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-700 dark:text-gray-300 font-medium">Year: 2022</div>
                    <div className="text-gray-600 dark:text-gray-400">CGPA: 7.66</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>
                    <div className="text-teal-600 dark:text-teal-400 font-semibold">12th (Math Science)</div>
                    <div className="text-gray-600 dark:text-gray-400">Board of Secondary Education, Madhya Pradesh (MP board)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-700 dark:text-gray-300 font-medium">Year: 2018</div>
                    <div className="text-gray-600 dark:text-gray-400">74.2%</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>
                    <div className="text-teal-600 dark:text-teal-400 font-semibold">10th</div>
                    <div className="text-gray-600 dark:text-gray-400">Board of Secondary Education, Madhya Pradesh (MP board)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-700 dark:text-gray-300 font-medium">Year: 2016</div>
                    <div className="text-gray-600 dark:text-gray-400">83.66%</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Declaration Section */}
          <div className="bg-white dark:bg-gray-800 p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 dark:text-white leading-8 mb-3">
              <span className="tracking-wide">Declaration</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              <p className="mb-4">All the information mentioned above in the resume is correct to the best of my knowledge and beliefs.</p>
              <p className="text-right font-semibold">(VIKASH MASKHARE)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
