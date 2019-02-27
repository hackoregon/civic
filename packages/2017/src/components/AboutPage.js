import React from 'react';
import styles from '../PlatformStyles';

const staticContent = 'Civic is an open source project of Hack Oregon, built entirely by volunteers committed to neutral, nonpartisan exploration of civic analytics.';

const AboutPage = () => (
  <div>
    <div className={`${styles.Page} ${styles.Hero} Hero`} id={styles.Hero} name={styles.Hero}>
      <div className="Container">
        <div className={`${styles.Content} Content`}>
          <h1>About Civic</h1>
        </div>
      </div>
    </div>
    <div className={styles.Page}>
      <div className="Container">
        <div className={`${styles.Content} Content`}>
          <div className={styles.row}>
            <p className="large">{staticContent}</p>
            <p>For more information, visit us at <a href="//hackoregon.org">hackoregon.org</a></p>
          </div>
          <div className={styles.row}>
            <h2>Platform Team</h2>
          </div>
          <div className={`${styles.column} column ${styles.Platform}`}>
            <ul>
              <li><a href="mailto:catherine@hackoregon.org">Cat Nikolovski</a>, <i>Founder and Executive Producer</i></li>
              <li><a href="mailto:megan@hackoregon.org">Megan Mckissack</a>, <i>Technical Lead</i></li>
              <li><a href="mailto:april@hackoregon.org">April Johnson</a>, <i>Community and Partnerships</i></li>
            </ul>
          </div>
          <div className={`${styles.column} column ${styles.Platform}`}>
            <ul>
              <li>Jason Bernert, <i>Multimedia Production</i></li>
              <li><a href="mailto:vengist@gmail.com">Ven Gist</a>, <i>Design Principal</i></li>
              <li><a href="mailto:adrienne.j.tilley@gmail.com">Adrienne Tilley</a>, <i>Design Principal</i></li>
            </ul>
          </div>
          <div className={`${styles.column} column ${styles.Platform}`}>
            <ul>
              <li>David Daniel, <i>Systems Architecture</i></li>
              <li>Dan Carr, <i>Systems Architecture</i></li>
            </ul>
          </div>
          <div className={`${styles.row} ${styles.Collection}`}>
            <h2>Collection Teams</h2>
          </div>
          <div className={`${styles.column} column ${styles.Collection}`}>
            <ul>
              <li><h3>Opportunity/Cost</h3></li>
              <li><h4>Core Team</h4></li>
              <li>Gabriele Hayden</li>
              <li>Matthew Tschabold</li>
              <li>Bimal Rajbhandry</li>
              <li>Victoria James</li>
              <li>Adrienne Tilley</li>
              <li>Derek DeMaria</li>
              <li>Esme D. Miller</li>
              <li>Christopher Moravec</li>
              <li>Paige Berry</li>
              <li>Troy Scott</li>
              <li>Mike Lonergan</li>
              <li>Jessiah Ratliff</li>
              <li>Michael Lange</li>
              <li>Noah Muldavin</li>
              <li>Leif Shackelford</li>
              <li>Pat Farnach</li>
              <li>John Tasto</li>
              <li>Robert Tyree</li>
              <li>Riley Rustad</li>
              <li>Jay McGrath</li>
              <li>Warren Friedland</li>
              <li>Shawn Marincas</li>
              <li>Eric Almodova</li>
              <li>Kartik Nagappa</li>
              <li>Jason Bernert</li>
              <li>Clem Freeman</li>
              <li><h4>Contributors</h4></li>
              <li>Dennis Hemken</li>
              <li>Sailor Winkelman</li>
              <li>Rajesh Rengarajan</li>
              <li>Finn Terdal</li>
              <li>Michael Dougherty</li>
              <li>Eric Gold</li>
              <li>Ankur Dholakia</li>
              <li>Michelle Wynant</li>
              <li>Simone Crowe</li>
              <li>Daniel Phillips</li>
              <li>Randy Morris</li>
              <li>Schola Choi</li>
              <li>Sarah Gilbert</li>
              <li>Hobson Lane</li>
              <li>Abigail Glunn</li>
              <li>Lindsay Bailey</li>
            </ul>
          </div>

          <div className={`${styles.column} column ${styles.Collection}`}>
            <ul>
              <li><h3>Unsheltered</h3></li>
              <li><h4>Core Team</h4></li>
              <li>Pete Russo</li>
              <li>Cinthia Manuel</li>
              <li>Kristin Wolff</li>
              <li>Maripat Hensel</li>
              <li>Andrew Roetker</li>
              <li>Dan Carr</li>
              <li>Janet Carr</li>
              <li>Lindsay Mico</li>
              <li>Stephanie Marson</li>
              <li>Zak Kent</li>
              <li>Jen Macias</li>
              <li>Stormi Hoebelheinrich</li>
              <li>Andrew Brennwald</li>
              <li>Clem Freeman</li>
              <li>Eric Gold</li>
              <li>Greg Adams</li>
              <li><h4>Contributors</h4></li>
              <li>Angela Dean</li>
              <li>Anna Shapiro</li>
              <li>Bryan Lehrer</li>
              <li>Caitlin Araldi</li>
              <li>Cory Meyers</li>
              <li>Keith Lay</li>
              <li>Kirsten J</li>
              <li>Molly McGlone</li>
              <li>Nick Lambert</li>
              <li>Robert Gassner</li>
              <li>Sara Jensen</li>
              <li>Diana Connolly</li>
              <li>Garret Hornby</li>
              <li>Jim Hensel</li>
              <li>Lily Gil</li>
              <li>Matt Bishop</li>
              <li>Niles McGiver</li>
              <li>Noah Kittleson</li>
              <li>Russ DuBrock</li>
              <li>Ryan Streur</li>
              <li>Tabitha Donaghue</li>
              <li>Treasure Porth</li>
              <li>April Johnson</li>
              <li>Jenny Mundy</li>
              <li>Anusha Balasubramaniam</li>
              <li>Annie Sonna</li>
            </ul>
          </div>

          <div className={`${styles.column} column ${styles.Collection}`}>
            <ul>
              <li><h3>The First Five Minutes</h3></li>
              <li><h4>Core Team</h4></li>
              <li>Hannah Kane</li>
              <li>Kyle Joecken</li>
              <li>Qing Zhou</li>
              <li>Chris Mills-Price</li>
              <li>Matt Hino</li>
              <li>Ryan Callihan</li>
              <li>Scott Tse</li>
              <li>Brian Grant</li>
              <li>Merritt Lawrenson</li>
              <li>Justine Wang</li>
              <li>Keir Staple</li>
              <li>Mark Whitaker</li>
              <li><h4>Contributors</h4></li>
              <li>Oskar Radon Kimball</li>
              <li>Russell Gould</li>
              <li>Kayla Warfield</li>
              <li>Liz Tom</li>
              <li>Marika Allely</li>
              <li>Emma Craddock</li>
              <li>HK Kahng</li>
              <li>Randy Veen</li>
              <li>Whitney Williams</li>
              <li>Adam Horbinski</li>
              <li>Gabe Khofri</li>
              <li>Mulu Habtemariam</li>
              <li>Devender Kaur</li>
              <li>Quinn Zepeda</li>
              <li>Jason Gigilp</li>
              <li>Andrew Moore</li>
            </ul>
          </div>

          <div className={`${styles.column} column ${styles.Collection}`}>
            <ul>
              <li><h3>State of Motion</h3></li>
              <li><h4>Core Team</h4></li>
              <li>Sanjuro Jogdeo</li>
              <li>Ed Borasky</li>
              <li>Kevin Saavedra</li>
              <li>Melissa Keith</li>
              <li>Emily Tritsch</li>
              <li>Tony Fuentes</li>
              <li>Lee Coates</li>
              <li><h4>Contributors</h4></li>
              <li>Chris Smith</li>
              <li>Joe Hand</li>
              <li>Matthew Gantz</li>
              <li>Tom Wikle</li>
              <li>Reid Beels</li>
              <li>Nathan Miller</li>
              <li>Taylor Bixby</li>
              <li>Alex Kachlik</li>
              <li>David J Myers</li>
              <li>Michael Voorhees</li>
              <li>Steve Johnson</li>
              <li>Michael Bunsen</li>
              <li>Shai Barash</li>
              <li>April Barrett</li>
              <li>Philip Orchard</li>
              <li>Cindy Mullins</li>
              <li>Tim Sawyer</li>
              <li>Jeff Beyer</li>
              <li>Daniel Tomas Ku</li>
              <li>Geoff Corvera</li>
              <li>Tom Rodrigues</li>
              <li>Emily Zhang</li>
              <li>Schuyler Klaassen</li>
              <li>Willard Trey Hucks</li>
              <li>Karla Arianne Reyes</li>
              <li>Andy Cunningham</li>
              <li>James Maynard</li>
              <li>Jaron Heard</li>
              <li>Ian Bellamy</li>
            </ul>
          </div>

          <div className={`${styles.column} column ${styles.Collection}`}>
            <ul>
              <li><h3>Run The Numbers</h3></li>
              <li><h4>Core Team</h4></li>
              <li>Jeanette Hardiman</li>
              <li>Mary Anne Thygesen</li>
              <li>Jim Tyhurst</li>
              <li>Ted Brunner</li>
              <li>Hassan Shamim</li>
              <li>Aurelia Moran</li>
              <li>Moss Drake</li>
              <li>Mike Lonergan</li>
              <li>Evan Palmer</li>
              <li>Aaron Devore</li>
              <li>David Abel</li>
              <li>Kari Goin</li>
              <li>Katie Lakey</li>
              <li>Shannon Carney</li>
              <li><h4>Contributors</h4></li>
              <li>Brett Davis</li>
              <li>Sheila Martin</li>
              <li>Mackenzie T Stout</li>
              <li>Hugh Glanville</li>
              <li>John Smith</li>
              <li>Jonathan Berthet</li>
              <li>Sam Higgins</li>
              <li>Ron Shafi</li>
              <li>Mark Wheeler</li>
              <li>Josh Overly</li>
              <li>Erik Sutherland</li>
              <li>Daniel Doherty</li>
              <li>Jesse Fizjarrell</li>
              <li>Evan Demaris</li>
              <li>Tiffany DeVine</li>
              <li>Haley Bristol</li>
              <li>Niki Garner</li>
              <li>Ami Sommariva</li>
            </ul>
          </div>

          <div className={`${styles.column} column ${styles.Collection}`}>
            <ul>
              <li><h3>Special Shout Outs</h3></li>
              <li>Megan McKissack</li>
              <li>Ven Gist</li>
              <li>Daniel Carr</li>
              <li>Merritt Lawrenson</li>
              <li>Brian Grant</li>
              <li>Peter Russo</li>
              <li>Sanjuro Jogdeo</li>
              <li>Jason Bernert</li>
              <li>Mike Lonergan</li>
              <li>David Daniel</li>
              <li>Tony Fuentes</li>
              <li>Michael Lange</li>
              <li>Clem Freeman</li>
              <li>Evan Palmer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  );

AboutPage.displayName = 'AboutPage';

export default AboutPage;
