import {
  academicCreate,
  courseCreate,
  academicDetails,
  courseDetails,
  academicsList,
  coursesList,
  clear,
} from './academics';

beforeEach(() => {
  clear();
});

describe('clear', () => {
  let academic;
  beforeEach(() => {
    academic = academicCreate('Magnus', 'chess');
  });

  test('returns empty dictionary', () => {
    expect(clear()).toStrictEqual({});
  });

  test('removes academic from database', () => {
    expect(academicsList(academic.academicId)).toStrictEqual({
      academics: [
        {
          academicId: academic.academicId,
          academicName: 'Magnus',
        }
      ]
    });
    clear();
    expect(academicsList(academic.academicId)).toStrictEqual({ error: 'error' });

    const academic2 = academicCreate('New User', 'New Hobby');
    expect(academicsList(academic2.academicId)).toStrictEqual({
      academics: [
        {
          academicId: academic2.academicId,
          academicName: 'New User',
        }
      ]
    });
  });

  test('removes course from database', () => {
    const course = courseCreate(academic.academicId, 'KING1001', "Queen's Gambit");
    expect(coursesList(academic.academicId, course.courseId)).toStrictEqual({
      courses: [
        {
          courseId: course.courseId,
          courseName: 'KING1001',
        }
      ]
    });
    clear();
    expect(academicsList(academic.academicId)).toStrictEqual({ error: 'error' });

    const academic2 = academicCreate('New User', 'New Hobby');
    expect(coursesList(academic2.academicId)).toStrictEqual({
      courses: []
    });
  });
});

describe('academicCreate', () => {
  test.each([
    { name: '', hobby: 'valid' },
    { name: 'valid', hobby: '' },
  ])("error: ('$name', '$hobby')", ({ name, hobby }) => {
    expect(academicCreate(name, hobby)).toStrictEqual({ error: 'error' });
  });

  const academicCreateObject = expect.objectContaining({
    academicId: expect.any(Number),
  });

  test('Containing the right keys', () => {
    expect(academicCreate('Magnus', 'chess')).toStrictEqual(academicCreateObject);
  });

  test('Can register same name, same hobby', () => {
    const a1 = academicCreate('Magnus', 'chess');
    const a2 = academicCreate('Magnus', 'chess');
    expect(a1).toStrictEqual(academicCreateObject);
    expect(a2).toStrictEqual(academicCreateObject);
    expect(a1).not.toStrictEqual(a2);
  });
});

describe('Protected functions', () => {
  const createAcademic = (name, hobby) => {
    return { name, hobby, ...academicCreate(name, hobby) };
  };

  const createCourse = (academicId, name, description) => {
    return { name, description, ...courseCreate(academicId, name, description) };
  };

  let academic;
  let course;
  beforeEach(() => {
    academic = createAcademic('Magnus', 'chess');
    expect(academic.academicId).not.toStrictEqual({ error: 'error' });

    course = createCourse(academic.academicId, 'COMP1531', 'description');
    expect(course.courseId).not.toStrictEqual({ error: 'error' });
  });

  describe('courseCreate', () => {
    test('invalid academicId', () => {
      expect(courseCreate(academic.academicId + 1, 'COMP1531', 'description')).toStrictEqual({ error: 'error' });
    });

    test.each([
      { name: '' },
      { name: 'COMP153L' },
      { name: '1531COMP' },
      { name: 'COMP153' },
      { name: 'COMP15311' },
      { name: 'CCOMP1531' },
      { name: 'comp1531' },
    ])("invalid course name: '$name'", ({ name }) => {
      expect(courseCreate(academic.academicId, name, '')).toStrictEqual({ error: 'error' });
    });

    const courseCreateObject = expect.objectContaining({
      courseId: expect.any(Number),
    });

    test('Containing the right keys', () => {
      expect(courseCreate(academic.academicId, 'COMP1531', 'desc')).toEqual(courseCreateObject);
    });

    test('Can register same course name, same description', () => {
      const c1 = courseCreate(academic.academicId, 'COMP1531', 'desc');
      const c2 = courseCreate(academic.academicId, 'COMP1531', 'desc');
      expect(c1).toStrictEqual(courseCreateObject);
      expect(c2).toStrictEqual(courseCreateObject);
      expect(c1).not.toStrictEqual(c2);
    });
  });

  describe('academicDetails', () => {
    test('invalid authId', () => {
      expect(academicDetails(academic.academicId + 1, academic.academicId)).toStrictEqual({ error: 'error' });
    });

    test('invalid viewId', () => {
      expect(academicDetails(academic.academicId, academic.academicId + 1)).toStrictEqual({ error: 'error' });
    });

    test('view self details', () => {
      expect(academicDetails(academic.academicId, academic.academicId)).toStrictEqual({
        academic: {
          academicId: academic.academicId,
          name: academic.name,
          hobby: academic.hobby,
        }
      });
    });

    test("view other academics' details", () => {
      const academic2 = academicCreate('applelover', 'eating');
      expect(academicDetails(academic.academicId, academic2.academicId)).toStrictEqual({
        academic: {
          academicId: academic2.academicId,
          name: 'applelover',
          hobby: 'eating',
        }
      });
      expect(academicDetails(academic2.academicId, academic.academicId)).toStrictEqual({
        academic: {
          academicId: academic.academicId,
          name: academic.name,
          hobby: academic.hobby,
        }
      });
    });
  });

  describe('courseDetails', () => {
    test('unknown academicId', () => {
      expect(courseDetails(academic.academicId + 1, course.courseId)).toStrictEqual({ error: 'error' });
    });

    test('not member academicId', () => {
      const a2 = academicCreate('a2', 'hobby');
      expect(courseDetails(a2.academicId, course.courseId)).toStrictEqual({ error: 'error' });
    });

    test('correct details', () => {
      expect(courseDetails(academic.academicId, course.courseId)).toStrictEqual({
        course: {
          ...course,
          allMembers: [academic],
          staffMembers: [academic],
        }
      });
    });
  });

  describe('academicsList', () => {
    test('unknown academicId', () => {
      expect(academicsList(academic.academicId + 1)).toStrictEqual({ error: 'error' });
    });

    test('one academic', () => {
      expect(academicsList(academic.academicId)).toStrictEqual({
        academics: [
          {
            academicId: academic.academicId,
            academicName: academic.name,
          }
        ]
      });
    });

    test('multiple academics', () => {
      const a2 = createAcademic('a2', 'h2');
      const a3 = createAcademic('a3', 'h3');
      const a4 = createAcademic('a4', 'h4');

      // Using set so that order won't matter
      const expected = new Set([
        {
          academicId: a2.academicId,
          academicName: a2.name,
        },
        {
          academicId: a4.academicId,
          academicName: a4.name,
        },
        {
          academicId: academic.academicId,
          academicName: academic.name,
        },
        {
          academicId: a3.academicId,
          academicName: a3.name,
        },
      ]);
      const received = new Set(academicsList(academic.academicId).academics);
      expect(received).toStrictEqual(expected);
    });
  });

  describe('coursesList', () => {
    test('unknown academicId', () => {
      expect(coursesList(academic.academicId + 1)).toStrictEqual({ error: 'error' });
    });

    test('one course', () => {
      expect(coursesList(academic.academicId)).toStrictEqual({
        courses: [
          {
            courseId: course.courseId,
            courseName: course.name,
          }
        ]
      });
    });

    test('multiple courses', () => {
      const c1 = createCourse(academic.academicId, 'COMP1511', 'desc');
      const c2 = createCourse(academic.academicId, 'COMP1521', 'desc');
      const c3 = createCourse(academic.academicId, 'COMP1531', 'desc');

      const expected = new Set([
        {
          courseId: c2.courseId,
          courseName: c2.name,
        },
        {
          courseId: course.courseId,
          courseName: course.name,
        },
        {
          courseId: c3.courseId,
          courseName: c3.name,
        },
        {
          courseId: c1.courseId,
          courseName: c1.name,
        },
      ]);
      const received = new Set(coursesList(academic.academicId).courses);
      expect(received).toStrictEqual(expected);
    });
  });
});
