/* eslint-disable import/prefer-default-export */

/** @jsx jsx */
import { jsx } from "@emotion/core";

const styles = {
  container: "prose",
  button:
    "bg-blue text-white py-2 px-4 shadow hover:shadow-hover active:shadow-active uppercase font-sans cursor-pointer"
};

export const KitchenSink = () => (
  <article className={styles.container}>
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

    <form>
      <div>
        <label htmlFor="text1">
          text
          <input type="text" id="text1" placeholder="voluptatem et inventore" />
        </label>
      </div>
      <div>
        <label htmlFor="pass1">
          password
          <input type="password" id="pass1" value="voluptatem" />
        </label>
      </div>
      <div>
        <label htmlFor="num1">
          number
          <input type="number" id="num1" placeholder="1" />
        </label>
      </div>
      <div>
        <label htmlFor="email1">
          email
          <input type="email" id="email1" placeholder="test@example.com" />
        </label>
      </div>
      <div>
        <label htmlFor="tel1">
          tel
          <input type="tel" id="tel1" placeholder="1234567890" />
        </label>
      </div>
      <div>
        <label htmlFor="search1">
          search
          <input type="search" id="search1" />
        </label>
      </div>
      <div>
        <label htmlFor="date1">
          date
          <input type="date" id="date1" />
        </label>
      </div>
      <div>
        <label htmlFor="textarea1">
          textarea
          <textarea id="textarea1"></textarea>
        </label>
      </div>
      <div>
        <label htmlFor="color1">
          color
          <input type="color" id="color1" />
        </label>
      </div>
      <div>
        <label htmlFor="range1">
          range
          <input type="range" id="range1" />
        </label>
      </div>
      <div>
        <label htmlFor="input2">
          file <input type="file" id="input2" />
        </label>
      </div>
      <div>
        <label htmlFor="select1">
          select
          <select id="select1">
            <option>corrupti</option>
            <option>iusto</option>
            <option>qui</option>
            <option>nihil</option>
            <option>nulla</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="select2">
          select w/ optgroup
          <select id="select2">
            <optgroup label="quod">
              <option>ut</option>
              <option>atque</option>
              <option>iure</option>
              <option>consequatur</option>
              <option>eaque</option>
            </optgroup>
            <optgroup label="eos">
              <option>ut</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="select3">
          select w/ multi
          <select multiple id="select3">
            <option>ut</option>
            <option>atque</option>
            <option>iure</option>
            <option>consequatur</option>
            <option>eaque</option>
            <option>ut</option>
          </select>
        </label>
      </div>
      <div>
        <fieldset>
          <legend>quos ut doloremque</legend>
          <div>
            <label htmlFor="radio1">
              <input type="radio" name="radios" checked id="radio1" /> radio
            </label>
          </div>
          <div>
            <label htmlFor="radio2">
              <input type="radio" name="radios" id="radio2" /> radio
            </label>
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor="check1">
          <input type="checkbox" name="checkboxes" checked id="check1" />
          checkbox
        </label>
      </div>
      <div>
        <label htmlFor="check2">
          <input type="checkbox" name="checkboxes" id="check2" /> checkbox
        </label>
      </div>

      <div>
        <button className={styles.button} type="button" name="button">
          Button
        </button>
        <input
          className={styles.button}
          type="button"
          name="input"
          value="Input Button"
        />
        <input
          className={styles.button}
          type="submit"
          name="submit"
          value="Submit Button"
        />
        <input
          className={styles.button}
          type="reset"
          name="reset"
          value="Reset Button"
        />
      </div>
    </form>
  </article>
);

KitchenSink.displayName = "KitchenSink";
