import {
  getDataForSelectedYear,
  getErrors,
  getSelectedYear,
  isDataPending,
} from './selectors';

describe('class-size-and-quality selectors', () => {
  describe('getDataForSelectedYear', () => {
    it('returns the data for the selected year', () => {
      const dataFor2017 = { class_size: 1, teacher_experience: 1, type: 'E', year: 2017 };
      const dataFor2018 = { class_size: 1, teacher_experience: 1, type: 'E', year: 2018 };

      const result = getDataForSelectedYear({
        classSizeAndQuality: {
          selectedYear: 2018,
          data: [
            dataFor2017,
            dataFor2018,
          ],
        },
      });

      expect(result).to.deep.equal([
        {
          classSize: 1,
          teacherExperience: 1,
          type: 'Elementary School',
        },
      ]);
    });
  });

  describe('getErrors', () => {
    it('returns the pending status', () => {
      const result = getErrors({
        classSizeAndQuality: {
          error: 'Test error',
        },
      });

      expect(result).to.eql('Test error');
    });
  });

  describe('getSelectedYear', () => {
    it('returns the selected year', () => {
      const result = getSelectedYear({
        classSizeAndQuality: {
          selectedYear: 2018,
        },
      });

      expect(result).to.eql(2018);
    });
  });

  describe('isDataPending', () => {
    it('returns the pending status', () => {
      const result = isDataPending({
        classSizeAndQuality: {
          pending: true,
        },
      });

      expect(result).to.be.true;
    });
  });
});
