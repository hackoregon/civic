/* eslint-disable import/prefer-default-export */

/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";

/*
  Don't wrap custom elements in the prose class!
  
  Instead do something like this:
  <div class="prose">
    PROSE
  </div>

  <div class="">
    CUSTOM STUFF
  </div>

  <div class="prose">
    PROSE
  </div>
*/

export const CivicProse = ({ variant }) => (
  // Do not dynamically generating classNames using string concatengation in prod
  // PurgeCSS will not identify classNames that are not explicit
  // See https://tailwindcss.com/docs/optimizing-for-production

  <article className={`prose ${variant}`}>
    <pre>className=&quot;prose{variant ? ` ${variant}` : ""}&quot;</pre>
    <h1>h1 Est Ullam Dolor</h1>
    <p>
      Ut <sup>est</sup> illum minus.{" "}
      <abbr title="Abbr">Similique dolor aut magni</abbr> ipsam id unde nam sit.
      Veritatis quis officia aut est cumque nam beatae. <sub>Itaque</sub>{" "}
      mollitia ut sed. <em>Rem fuga modi voluptatibus voluptas incidunt.</em>{" "}
      Eius sed officia non modi.
    </p>

    <p>
      Quis reprehenderit possimus nam illo. Iure ut magnam dolore laborum et non
      omnis.{" "}
      <strong>Sed facilis quis provident asperiores necessitatibus</strong>{" "}
      voluptatem et inventore.{" "}
      <del>Reiciendis tenetur repudiandae quis quos et.</del>{" "}
      <small>Facilis</small> vitae veritatis consequuntur.
    </p>

    <blockquote>
      <p>
        Fugiat culpa deserunt est tempore officiis reiciendis. Distinctio dolor
        sunt hic. Facilis aut sunt et et molestias dolore.
      </p>
      <footer>
        <cite>-aperiam</cite>
      </footer>
    </blockquote>

    <h2>h2 corporis maxime quia</h2>
    <p>
      Ex minima eligendi <a href="//example.com">veritatis sapiente</a> aut
      unde. Magni velit est labore. <code>Omnis dolores minima</code> nobis non
      nihil ipsam nisi voluptas expedita.
    </p>

    <h3>h3 tenetur sint error</h3>

    <ul>
      <li>culpa sunt adipisci</li>
      <li>
        ut velit eius
        <ul>
          <li>omnis et aut</li>
          <li>delectus voluptatem aspernatur</li>
        </ul>
      </li>
      <li>necessitatibus repudiandae omnis</li>
    </ul>

    <hr />

    <ol>
      <li>culpa sunt adipisci</li>
      <li>
        ut velit eius
        <ol>
          <li>omnis et aut</li>
          <li>delectus voluptatem aspernatur</li>
        </ol>
      </li>
      <li>necessitatibus repudiandae omnis</li>
    </ol>

    <h4>h4 dolor eius aut</h4>

    <dl>
      <dt>Definition list</dt>
      <dd>
        Blanditiis neque consequatur omnis facilis adipisci deserunt eos
        voluptate minus.
      </dd>
      <dt>harum unde hic</dt>
      <dd>Cupiditate nobis necessitatibus sit provident ut et.</dd>
    </dl>

    <pre>
      mmmmm toot mmmm toot mm m __ ____||___ [O] o o | _______|________| \v /
      ```````````````````````````
    </pre>

    <hr />

    <h5>h5 est voluptas molestias</h5>

    <table>
      <caption>
        Id illo minima consequatur expedita voluptatum perferendis voluptas
        laboriosam.
      </caption>
      <thead>
        <tr>
          <th>et</th>
          <th>magnam</th>
          <th>nostrum</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th colSpan="3">
            Aut quo est inventore vel dolorem modi non adipisci illum.
          </th>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>quia ea inventore</td>
          <td>voluptas</td>
          <td>123</td>
        </tr>
        <tr>
          <td>quia ea inventore</td>
          <td>voluptas</td>
          <td>123</td>
        </tr>
      </tbody>
    </table>

    <h6>h6 officiis ut nulla</h6>

    <figure>
      <img src="//unsplash.it/800/600" alt="sint odit perspiciatis" />
      <figcaption>
        Qui pariatur et sed eius ea rerum quae architecto voluptatem.
      </figcaption>
    </figure>
  </article>
);

CivicProse.propTypes = {
  variant: PropTypes.oneOf("prose-sm", "prose-lg", "prose-xl", "prose-2xl")
};

CivicProse.displayName = "Prose";
