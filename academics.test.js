import {
  academicCreate,
  courseCreate,
  academicDetails,
  courseDetails,
  academicsList,
  coursesList,
  clear,
} from './academics';

test('Remove this test and uncomment the other tests', () => {
  expect(1 + 1).toEqual(2);
});

/*

// FIXME
// This is a sample test that tests many functions
// You may want to break this up into multiple tests.
describe('Sample test', () => {
  test('error creating academics', () => {
    // Every test should be indendent of other tests. This can be achieve by
    // clearing and reinitialising the database.
    // You may want to look at Jest's beforeEach and afterEach.
    clear();

    // Empty name
    expect(academicCreate('', 'dancing')).toStrictEqual({ error: 'error' });
  });

  test('correct return type', ()=> {
    // Consider beforeEach
    clear();

    const academic = academicCreate('Magnus', 'chess');

    // NOTE: We don't actually know what the generated ID should be
    expect(academic).toStrictEqual(
      expect.objectContaining({
        academicId: expect.any(Number),
      })
    );

    // However, we can still use this ID in other functions
    expect(academicDetails(academic.academicId, academic.academicId)).toStrictEqual({
      academicId: academic.academicId,
      name: 'Magnus',
      hobby: 'chess',
    });

    // Note the different key for "name" in this function - refer to "Data Types"
    // When comparing arrays with multiple items, you may want to convert each
    // array into a Set (since we don't know which order the items will be in).
    expect(academicsList(academic.academicId)).toStrictEqual({
      academics: [
        {
          academicId: academic.academicId,
          academicName: 'Magnus',
        }
      ]
    });
  });
});

*/
