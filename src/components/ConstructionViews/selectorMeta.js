const SELECTOR_META = {
  mapTypes: ['Features', 'Conflicts', 'Nearby'],
  conflicts: {
    distance: {
      type: 'dropdown',
      options: [50, 100, 300, 500, 1000],
    },
    days: {
      type: 'dropdown',
      options: [7, 14, 21, 30, 60, 180],
    },
    startDate: {
      type: 'date',
    },
    endDate: {
      type: 'date',
    },
  },
  features: {
    sourceName: {
      type: 'dropdown',
      options: ['Grind and Pave', 'Capital Improv. Proj.', 'ROW Closures', 'Pavement Moratorium', 'Street Permits'],
    },
    startDate: {
      type: 'date',
    },
    endDate: {
      type: 'date',
    },
  },
  nearby: {
    distance: {
      type: 'dropdown',
      options: [50, 100, 300, 500, 1000],
    },
    address: {
      type: 'textbox',
    },
    startDate: {
      type: 'date',
    },
    endDate: {
      type: 'date',
    },
  },

};

export default SELECTOR_META;