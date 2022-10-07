<template>
  <div class="me-page">
    <section>
      <div class="container">
        <header class="major">
          <h2>Hi 🤩</h2>
          <p>
            My name is Kevin Zhao,<br />
            but I usually go by the name of `<a href="#me">KevInZhao</a>` in
            social networking.
          </p>
        </header>
        <p>
          I love <b>Thinking</b> and I do believe <b>Idea</b> can make a better
          world.<br />
          I love <b>Coding</b> and I do believe <b>Software</b> changes the
          human race.<br />
          I love <b>Contributing</b> and I do believe <b>Open Source</b> is
          where the great things happen.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MePage",
};
</script>

<style scoped lang="scss">
.me-page {
  /* Basic */

  color: #888;
  background: #fff;
  font-size: 16pt;
  font-weight: 400;
  line-height: 1.75em;
  vertical-align: baseline;

  a {
    -moz-transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    -webkit-transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    -ms-transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    border-bottom: solid 1px #e4e4e4;
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    border-bottom-color: transparent;
    color: #42b983 !important;
  }

  strong,
  b {
    color: #2c3e50;
    font-weight: 700;
  }

  em,
  i {
    font-style: italic;
  }

  p {
    margin: 0 0 2.25em 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #2c3e50;
    font-weight: 700;
    line-height: 1em;
    margin: 0 0 0.5625em 0;
  }

  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a {
    border: 0;
    color: #2c3e50;
    text-decoration: none;
  }

  h2 {
    font-size: 2em;
    line-height: 1.5em;
  }

  h3 {
    font-size: 1.75em;
    line-height: 1.5em;
  }

  h4 {
    font-size: 1.25em;
    line-height: 1.5em;
  }

  h5 {
    font-size: 0.9em;
    line-height: 1.5em;
  }

  h6 {
    font-size: 0.7em;
    line-height: 1.5em;
  }

  /* Container */

  .container {
    margin: 0 auto;
    max-width: calc(100% - 4.5em);
    width: 45em;
  }

  .container.xsmall {
    width: 11.25em;
  }

  .container.small {
    width: 22.5em;
  }

  .container.medium {
    width: 33.75em;
  }

  .container.large {
    width: 56.25em;
  }

  .container.xlarge {
    width: 67.5em;
  }

  .container.max {
    width: 100%;
  }

  @media screen and (max-width: 1024px) {
    .container {
      width: 100% !important;
    }
  }

  @media screen and (max-width: 480px) {
    .container {
      max-width: calc(100% - 3.375em);
    }
  }

  /* Section */

  section {
    text-align: left;
    font-family: source-code-pro, cursive;
  }

  header p {
    color: #aaa;
    position: relative;
    margin: 0 0 1.6875em 0;
  }

  header h2 + p {
    font-size: 1.25em;
    margin-top: -0.5em;
    line-height: 1.5em;
  }

  header h3 + p {
    font-size: 1.1em;
    margin-top: -0.35em;
    line-height: 1.5em;
  }

  header h4 + p,
  header h5 + p,
  header h6 + p {
    font-size: 0.9em;
    margin-top: -0.25em;
    line-height: 1.5em;
  }

  header.major h2 {
    color: #42b983;
    font-size: 3.5em;
  }

  header.major h2 + p {
    color: #2c3e50;
    font-size: 1.75em;
    font-weight: 700;
    margin-top: -0.75em;
  }
}
</style>
