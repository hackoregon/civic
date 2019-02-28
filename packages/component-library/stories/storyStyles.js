import { SSL_OP_TLS_BLOCK_PADDING_BUG } from "constants";

/*
  Styles used in Storybook.
  Only styles that are needed exclusively in Storybook are defined here.
*/

const storybookStyles = {
    // The display area for components
    main: {
      backgroundColor: 'white',
      margin: 15,
      maxWidth: 800,
    },

    // Use CSS grid to center UI components in the Storybook display area
    storyGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr',
      gridGap: '10px',
    },

    storyGridItem: {
      gridRow: 2,
      gridColumn: 2,
      alignSelf: 'center',
      justifyContent: 'center',
    },

    // Show inverted logos on a dark background in the Branding Logos section
    invertedLogo: {
      backgroundColor: '#201024',
      margin: 20,
      padding: 20,
    },

    logo: {
      padding: 0,
    },

  };

  export { storybookStyles };
