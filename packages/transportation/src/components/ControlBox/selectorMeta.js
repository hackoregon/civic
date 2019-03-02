const SELECTOR_META = {
  mapTypes: ['Features', 'Conflicts', 'Nearby'],
  conflicts: {
    distance: {
      type: 'dropdown',
      options: [50, 100, 300, 500, 1000],
      label: 'Distance',
      units: 'm',
    },
    days: {
      type: 'dropdown',
      options: [7, 14, 21, 30, 60, 180],
      label: 'Days',
      units: ' days',
    },
    startDate: {
      type: 'date',
      label: 'Start Date',
    },
    endDate: {
      type: 'date',
      label: 'End Date',
    },
  },
  features: {
    sourceName: {
      type: 'dropdown',
      options: [
        'Grind and Pave',
        'Capital Improv. Proj.',
        'ROW Closures',
        'Pavement Moratorium',
        'Street Permits',
      ],
      label: 'Source Name',
    },
    startDate: {
      type: 'date',
      label: 'Start Date',
    },
    endDate: {
      type: 'date',
      label: 'End Date',
    },
  },
  nearby: {
    distance: {
      type: 'dropdown',
      options: [50, 100, 300, 500, 1000],
      label: 'Distance',
      units: 'm',
    },
    address: {
      type: 'textbox',
      label: 'Address',
    },
    startDate: {
      type: 'date',
      label: 'Start Date',
    },
    endDate: {
      type: 'date',
      label: 'End Date',
    },
  },
};

export default SELECTOR_META;
