/**
*
* HomePage
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
import styles from './styles.css';

const HomePage = () => (
  <div>
    <div className={`${styles.Platform} ${styles.Hero}`} id={styles.Hero} name={styles.Hero}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <h1 className={styles.step1}>CIVIC<br />is an<br />open<br />platform</h1>
          <h1 className={styles.step2}>CIVIC<br />is a<br />data<br />platform</h1>
          <h1 className={styles.step3}>CIVIC<br />is a<br />public<br />platform</h1>
          <h1 className={styles.step4}>CIVIC<br />is an<br />engaged<br />platform</h1>
          <h1 className={styles.step5}>CIVIC<br />is an<br />insightful<br />platform</h1>
          <h1 className={styles.step6}>CIVIC<br />is a<br />human<br />platform</h1>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} ${styles.Housing}`}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <a className={styles.Tag} href="#">Housing</a>
          <h1>Opportunity/Cost</h1>
          <a className={styles.Link} href="#">
            View Collection <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} ${styles.Homelessness}`}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <a className={styles.Tag} href="#">Homelessness</a>
          <h1>Unsheltered</h1>
          <a className={styles.Link} href="#">
            View Collection <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} ${styles.EmergencyResponse}`}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <a className={styles.Tag} href="#">Emergency Response</a>
          <h1>The First Five Minutes</h1>
          <a className={styles.Link} href="#">
            View Collection <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} ${styles.Transportation}`}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <a className={styles.Tag} href="#">Transportation</a>
          <h1>State of Motion</h1>
          <a className={styles.Link} href="#">
            View Collection <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} ${styles.Budget}`}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <a className={styles.Tag} href="#">Budget</a>
          <h1>Run The Numbers</h1>
          <a className={styles.Link} href="#">
            View Collection <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

HomePage.displayName = 'HomePage';
// HomePage.propTypes = {
//   children: PropTypes.node,
// };

export default HomePage;
