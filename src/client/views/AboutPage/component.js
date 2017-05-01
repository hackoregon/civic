/**
*
* AboutPage
*
*/

import React from 'react';
import styles from './styles.css';

const staticContent = 'Civic is a radical new open data platform that enables engaged exploration of civic analytics. We make public information, public knowledge. Powered by the people, for the people.';

const AboutPage = () => (
  <div>
    <div className={`${styles.Page} ${styles.Hero}`} id={styles.Hero} name={styles.Hero}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <h1>About Civic</h1>
        </div>
      </div>
    </div>
    <div className={styles.Page}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <div className={styles.row}>
            <p className={styles.large}>{staticContent}</p>
          </div>
          <div className={styles.row}>
            <h2>Platform Team</h2>
          </div>
          <div className={`${styles.column} ${styles.Platform}`}>
            <ul>
              <li><a href="mailto:catherine@hackoregon.org">Cat Nikolovski</a>, <i>Founder and Executive Producer</i></li>
              <li><a href="mailto:megan@hackoregon.org">Megan Mckissack</a>, <i>Technical Lead</i></li>
              <li><a href="mailto:april@hackoregon.org">April Johnson</a>, <i>Community and Partnerships</i></li>
              <li>Jason Bernert, <i>Multimedia Production</i></li>
            </ul>
          </div>
          <div className={`${styles.column} ${styles.Platform}`}>
            <ul>
              <li><a href="mailto:vengist@gmail.com">Ven Gist</a>, <i>Design Principal</i></li>
              <li>Adrienne Tilley, <i>Design Principal</i></li>
              <li>David Daniel, <i>Systems Architecture</i></li>
              <li>Dan Carr, <i>Systems Architecture</i></li>
            </ul>
          </div>
          <div className={`${styles.row} ${styles.Collection}`}>
            <h2>Collection Teams</h2>
          </div>

          <div className={`${styles.column} ${styles.Collection}`}>
            <ul>
              <li><h3>Opportunity/Cost</h3></li>
              <li><h4>Core Team</h4></li>
              <li>lorem</li>
              <li><h4>Contributors</h4></li>
              <li>lorem</li>
            </ul>
          </div>

          <div className={`${styles.column} ${styles.Collection}`}>
            <ul>
              <li><h3>Unsheltered</h3></li>
              <li><h4>Core Team</h4></li>
              <li>lorem</li>
              <li><h4>Contributors</h4></li>
              <li>lorem</li>
            </ul>
          </div>

          <div className={`${styles.column} ${styles.Collection}`}>
            <ul>
              <li><h3>The First Five Minutes</h3></li>
              <li><h4>Core Team</h4></li>
              <li>lorem</li>
              <li><h4>Contributors</h4></li>
              <li>lorem</li>
            </ul>
          </div>

          <div className={`${styles.column} ${styles.Collection}`}>
            <ul>
              <li><h3>State of Motion</h3></li>
              <li><h4>Core Team</h4></li>
              <li>lorem</li>
              <li><h4>Contributors</h4></li>
              <li>lorem</li>
            </ul>
          </div>

          <div className={`${styles.column} ${styles.Collection}`}>
            <ul>
              <li><h3>Run The Numbers</h3></li>
              <li><h4>Core Team</h4></li>
              <li>lorem</li>
              <li><h4>Contributors</h4></li>
              <li>lorem</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
  );

AboutPage.displayName = 'AboutPage';

export default AboutPage;
