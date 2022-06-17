import {
  academicCreate,
  courseCreate,
  academicDetails,
  courseDetails,
  academicsList,
  coursesList,
  clear,
} from './academics';

describe('Details function tests', () => {
  clear();
  test('error cases', () => {
    const academic = academicCreate('Aya', 'music');
    expect(academicDetails(academic.academicId, -999)).toStrictEqual({ error: 'error'});
    expect(academicDetails(-999, academic.academicId)).toStrictEqual({ error: 'error'});

    expect(courseDetails(-999, -999)).toStrictEqual({ error: 'error'});
    expect(courseDetails(academic.academicId, -999)).toStrictEqual({ error: 'error'});
  });
  clear();
  test('correct academicDetails return', () => {
    const academic = academicCreate('Aya', 'music');
    expect(academicDetails(academic.academicId, academic.academicId)).toMatchObject({
      academic: {
        academicId: academic.academicId,
        name: 'Aya',
        hobby: 'music',
      }
    });
  });
  clear();
  test('correct courseDetails return', () => { 
    const academic = academicCreate('Aya', 'music');
    const course = courseCreate(academic.academicId, 'COMP2521','ABCDEF');
    expect(courseDetails(academic.academicId, course.courseId)).toMatchObject({
      course: {
        courseId: course.courseId,
        name: 'COMP2521',
        description: 'ABCDEF',
        staffMembers: [ academic.academicId ],
        allMembers: [ academic.academicId ],
      } 
    });
  });

});
describe('academicCreate function tests', () => {
  test('error cases', () => {
    // Every test should be indendent of other tests. This can be achieve by
    // clearing and reinitialising the database.
    // You may want to look at Jest's beforeEach and afterEach.
    clear();

    // Empty name
    expect(academicCreate('', 'dancing')).toStrictEqual({ error: 'error' });
    // Empty hobby
    expect(academicCreate('Bob', '')).toStrictEqual({ error: 'error' });
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
      academic: {
        academicId: academic.academicId,
        name: 'Magnus',
        hobby: 'chess',
      }
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

describe('courseCreate function tests', () => {
  test('error creating courses', () => {
    clear();
    expect(courseCreate('', 'COMP2521', 'abcdefg')).toStrictEqual({ error: 'error'});
    
    const academic = academicCreate('Magnus', 'chess');
    expect(courseCreate(academic.academicId, 'comp2521', 'abcdefg')).toStrictEqual({ error: 'error'});
    expect(courseCreate(academic.academicId, 'COMPabcd', 'abccded')).toStrictEqual({ error: 'error'});

  });
  test('courseCreate correct return', () => {
    clear();
    const academic = academicCreate('Magnus', 'chess');
    const course = courseCreate(academic.academicId, 'COMP2521', 'Data Structures and Algo');
    expect(course).toStrictEqual(
      expect.objectContaining({
        courseId: expect.any(Number),
      })
    );
  
  expect(courseDetails(academic.academicId, course.courseId,)).toMatchObject({
    course: {
      courseId: course.courseId,
      name: 'COMP2521',
      allMembers: [academic.academicId],
      staffMembers: [academic.academicId],
    }
  });

  expect(coursesList(academic.academicId)).toStrictEqual({
    courses: [
      {
        courseId: course.courseId,
        courseName: 'COMP2521'
      }
    ]
  })
  });

});

describe('Lists function tests', () => {
  clear();
  test('error cases', () => {
    expect(academicsList(-999)).toStrictEqual({ error: 'error'});
    expect(coursesList(-999)).toStrictEqual({ error: 'error'});
  })
  clear();
  test('correct return', ()=> {
    clear();
    const a = academicCreate('Aya', 'music');
    const coursea = courseCreate(a.academicId, 'COMP2521','ABCDEF');
    const b = academicCreate('Bob', 'eat');
    const courseb = courseCreate(b.academicId, 'COMP1531','ABCDEF');
    expect(academicsList(a.academicId)).toMatchObject({
      academics: [
        { academicId: a.academicId, academicName: 'Aya' },
        { academicId: b.academicId, academicName: 'Bob' },
      ]
    });
    expect(coursesList(a.academicId)).toMatchObject({
      courses: [
        { courseId: 10, courseName: 'COMP2521' },
        { courseId: 20, courseName: 'COMP1531' },
      ]
    });
  })
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
      academic: {
        academicId: academic.academicId,
        name: 'Magnus',
        hobby: 'chess',
      }
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
