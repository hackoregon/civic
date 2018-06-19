import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './index';

const mockStore = configureMockStore([thunk]);

const DEFAULT_SCHOOL = 'tbd';

describe('student-enrollment-trends', () => {
  describe('student-enrollment-trends actions', () => {
    describe('student-enrollment-trends api actions', () => {
      it('should have a start action', () => {
        const expectedAction = {
          type: actions.API_START,
        };

        expect(actions.studentEnrollmentStart()).to.eql(expectedAction);
      });

      it('should have a success action', () => {
        const payload = {
          some: {
            test: ['d', 'a', 't', 'a'],
          },
        };
        const expectedAction = {
          type: actions.API_SUCCESS,
          payload,
        };
        expect(actions.studentEnrollmentSuccess(payload)).to.eql(expectedAction);
      });

      it('should have an error action', () => {
        const payload = {
          some: {
            test: ['d', 'a', 't', 'a'],
          },
        };
        const expectedAction = {
          type: actions.API_ERROR,
          payload,
        };

        expect(actions.studentEnrollmentError(payload)).to.eql(expectedAction);
      });
    });
/*
    describe('student-enrollment-trends api thunk', () => {
      let store;

      beforeEach(() => {
        store = mockStore({});
      });

      it('should dispatch start and success actions when successful', () => {
        const action1 = { type: actions.API_START };
        const action2 = { type: actions.API_SUCCESS };

        return store.dispatch(actions.fetchStudentEnrollment()).then(() => {
          const actionHistory = store.getActions();

          expect(actionHistory).to.have.lengthOf(2);
          expect(actionHistory[0]).to.eql(action1);
          expect(actionHistory[1].type).to.equal(action2.type);
          expect(actionHistory[1].payload).to.exist;
        });
      });
    });
*/
  });
  describe('student-enrollment-trends reducer', () => {
    const initialState = {
      pending: false,
      error: null,
      data: null,
      selectedSchool: null,
    };
    const payload = { stu: 'ff' };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState);
    });

    it('should handle API_START', () => {
      expect(reducer(initialState, {
        type: actions.API_START,
      })).to.eql({
        pending: true,
        error: null,
        data: null,
        selectedSchool: null,
      });
    });

    it('should handle API_SUCCESS', () => {
      expect(reducer({ pending: true, error: null, data: null }, {
        type: actions.API_SUCCESS,
        payload,
      })).to.eql({
        pending: false,
        data: payload,
        selectedSchool: DEFAULT_SCHOOL,
      });
    });

    it('should handle API_ERROR', () => {
      expect(reducer({ pending: true, error: null, data: null }, {
        type: actions.API_ERROR,
        payload,
      })).to.eql({
        pending: false,
        error: payload,
      });
    });
  });

  describe('student-enrollment-trends selectors', () => {
    describe('getStudentEnrollmentRequest', () => {
      it('extends the root selector', () => {
        const expectation = { one: 'two', three: 4 };

        expect(selectors.getStudentEnrollmentRequest({
          studentEnrollment: expectation,
        })).to.eql(expectation);

        expect(selectors.getStudentEnrollmentRequest({
          red: 'herring',
          neighborhood: {
            studentEnrollment: expectation,
          },
        })).to.eql(expectation);
      });
    });

    describe('getStudentEnrollmentData', () => {
      it('returns undefined when there is no data', () => {
        expect(selectors.getStudentEnrollmentData({
          studentEnrollment: {
            no: 'data to be seen',
          },
        })).to.be.undefined;
      });

      it('returns undefined when data has no data', () => {
        expect(selectors.getStudentEnrollmentData({
          studentEnrollment: {
            notdata: {
              alsonotdata: {},
            },
          },
        })).to.be.undefined;
      });
    });

    describe('isStudentEnrollmentPending', () => {
      it('returns false when there is no value for pending', () => {
        expect(selectors.isStudentEnrollmentPending({
          studentEnrollment: {
            no: 'pending property',
          },
        })).to.be.false;
      });

      it('returns false when the value for pending is false', () => {
        expect(selectors.isStudentEnrollmentPending({
          studentEnrollment: {
            pending: false,
          },
        })).to.be.false;
      });

      it('returns true when the value for pending is true', () => {
        expect(selectors.isStudentEnrollmentPending({
          studentEnrollment: {
            pending: true,
          },
        })).to.be.true;
      });
    });

    describe('getselectedSchool', () => {
      it('returns undefined when there is no selectedSchool', () => {
        expect(selectors.getSelectedSchool({
          studentEnrollment: {
            no: 'data to be seen',
          },
        })).to.be.undefined;
      });

      it('returns a selectedSchool when one exists', () => {
        expect(selectors.getSelectedSchool({
          studentEnrollment: {
            selectedSchool: DEFAULT_NEIGHBORHOOD,
          },
        })).to.eql(DEFAULT_NEIGHBORHOOD.value);
      });
    });

    describe('getListOfNeighborhoods', () => {
      it('returns undefined when there is no data', () => {
        expect(selectors.getListOfNeighborhoods({
          studentEnrollment: {
            no: 'data to be seen',
          },
        })).to.be.undefined;
      });

      it('returns a listOfNeighborhoods when there is data', () => {
        expect(selectors.getListOfNeighborhoods({
          studentEnrollment: {
            data: { data: { results: SAMPLE_DATA } },
          },
        })).to.eql([DEFAULT_NEIGHBORHOOD]);
      });
    });

    describe('getDataForSelectedSchool', () => {
      const FORMATTED_DATA = [
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '18-25', year: 2006, value: 0.11 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '18-25', year: 2007, value: 0.12 },
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '26-32', year: 2006, value: 0.27 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '26-32', year: 2007, value: 0.27 },
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '33-39', year: 2006, value: 0.23 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '33-39', year: 2007, value: 0.21 },
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '40-49', year: 2006, value: 0.18 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '40-49', year: 2007, value: 0.17 },
        { id: 1, neighborhood: 'ROSE CITY PARK', type: '50+', year: 2006, value: 0.21 },
        { id: 2, neighborhood: 'ROSE CITY PARK', type: '50+', year: 2007, value: 0.23 },
      ];
      it('returns false when there is no data', () => {
        expect(selectors.getDataForSelectedSchool({
          studentEnrollment: {
            no: 'data to be seen',
          },
        })).to.be.false;
      });

      it('returns data for a selectedSchool when there is data', () => {
        expect(selectors.getDataForSelectedSchool({
          studentEnrollment: {
            data: { data: { results: SAMPLE_DATA } },
            selectedSchool: DEFAULT_NEIGHBORHOOD,
          },
        })).to.eql(FORMATTED_DATA);
      });
    });
  });
});
