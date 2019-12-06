import React from "react";
import { Link } from "react-router";
import styles from "../PlatformStyles";

const HomePage = () => (
  <div>
    <div
      className={`${styles.Platform} Hero ${styles.Hero}`}
      id={styles.Hero}
      name={styles.Hero}
    >
      <div className="Container">
        <div className={`${styles.Content} Content`}>
          <h1 className="step1">
            CIVIC
            <br />
            is an
            <br />
            open
            <br />
            platform
          </h1>
          <h1 className="step2">
            CIVIC
            <br />
            is a<br />
            data
            <br />
            platform
          </h1>
          <h1 className="step3">
            CIVIC
            <br />
            is a<br />
            public
            <br />
            platform
          </h1>
          <h1 className="step4">
            CIVIC
            <br />
            is an
            <br />
            engaged
            <br />
            platform
          </h1>
          <h1 className="step5">
            CIVIC
            <br />
            is an
            <br />
            insightful
            <br />
            platform
          </h1>
          <h1 className="step6">
            CIVIC
            <br />
            is a<br />
            human
            <br />
            platform
          </h1>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} Hero Housing`}>
      <div className="Container">
        <div className={`${styles.Content} Content`}>
          <a className={styles.Tag} href="#">
            Housing
          </a>
          <h1>Opportunity/Cost</h1>
          <Link className={styles.Link} to="/housing">
            View Collection <i className="fa fa-angle-right" />
          </Link>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} Hero Homelessness`}>
      <div className="Container">
        <div className={`${styles.Content} Content`}>
          <a className={styles.Tag} href="#">
            Homelessness
          </a>
          <h1>Unsheltered</h1>
          <Link className={styles.Link} to="/homelessness">
            View Collection <i className="fa fa-angle-right" />
          </Link>
        </div>
      </div>
    </div>
    <div
      className={`${styles.Collection} ${styles.Hero} Hero EmergencyResponse`}
    >
      <div className="Container">
        <div className={`${styles.Content} Content`}>
          <a className={styles.Tag} href="#">
            Emergency Response
          </a>
          <h1>The First Five Minutes</h1>
          <Link className={styles.Link} to="/emergency">
            View Collection <i className="fa fa-angle-right" />
          </Link>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} Hero Transportation`}>
      <div className="Container">
        <div className={`${styles.Content} Content`}>
          <a className={styles.Tag} href="#">
            Transportation
          </a>
          <h1>State of Motion</h1>
          <Link className={styles.Link} to="/transportation">
            View Collection <i className="fa fa-angle-right" />
          </Link>
        </div>
      </div>
    </div>
    <div className={`${styles.Collection} ${styles.Hero} Hero Budget`}>
      <div className="Container">
        <div className={`${styles.Content} Content`}>
          <a className={styles.Tag} href="#">
            Budget
          </a>
          <h1>Run The Numbers</h1>
          <Link className={styles.Link} to="/budget">
            View Collection <i className="fa fa-angle-right" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

HomePage.displayName = "HomePage";

export default HomePage;
