import { SSL_OP_TLS_BLOCK_PADDING_BUG } from "constants";

/*
Styles used in Storybook for the UI Style Guide pages
*/

const styles = {
    main: {
      backgroundColor: 'white',
      margin: 15,
      maxWidth: 800,
      lineHeight: 1.5,
      fontFamily: 'Rubik, "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
    },

    h1: {
      backgroundColor: 'white',
      color: '#201024',
      fontSize: '2em',
    },

    h2: {
      backgroundColor: 'white',
      color: '#ee495c',
      fontsize: '1.75em',
    },

    h3: {
      backgroundColor: 'white',
      color: '#201024',
      fontSize: '1.75em',
    },

    h4: {
      backgroundColor: 'white',
      color: '#201024',
      fontWeight: 'bold',
      fontSize: '1.5em',
      marginBottom: 5,
    },

    p: {
      backgroundColor: 'white',
      color: '#201024',
      fontSize: 16,
    },

    ul: {
      fontFamily: 'Rubik, "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
      fontSize: 15,
    },

    storyGrid: {
      display: 'grid',
      //gridTemplateColumns: 'auto auto auto',
      gridTemplateColumns: '1fr 2fr 1fr',
      //gridTemplateRows: 'auto auto auto',
      gridTemplateRows: '1fr 1fr 1fr',
      gridGap: '10px',
    },

    storyGridItem: {
      gridRow: 2,
      gridColumn: 2,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    invertLogo: {
      display: 'block',
      backgroundColor: '#201024',
      padding: 20,
    },

    logo: {
      width: 200,
    },
  
    link: {
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2,
    },
  
    code: {
      fontSize: 15,
      fontWeight: 600,
      padding: '2px 5px',
      border: '1px solid #eae9e9',
      borderRadius: 4,
      backgroundColor: '#f3f2f2',
      color: '#3a3a3a',
    },
  };

  export { styles };
