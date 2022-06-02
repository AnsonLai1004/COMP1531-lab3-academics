/**
 * @module academics
 */

/**
 * Create your dataStore here. The design is entirely up to you!
 * One possible starting point is
 *
 * let/const dataStore = {
 *   academics: [],
 *   courses: []
 * }
 *
 * and adding to the dataStore the necessary information when the
 * "register" functions are used.
 *
 * You will also need to modify the clear function accordingly
 * - we recommend you complete clear() at the bottom first!
 * 
 * Do not export the dataStore. Your tests should not use/rely on
 * how dataStore is structured - only what goes in and out of the
 * defined functions from the interface.
 */

// TODO

/**
 * Complete the functions from the interface table.
 * As an optional activity, you can document your functions
 * similar to how academicCreate has been done.
 * Reminder to return { error: 'error' } for error cases.
 */

/**
 * Creates a new academic, returning an object containing
 * a unique academic id
 *
 * @param {string} name
 * @param {string} hobby
 * @returns {{academicId: number}}
 */
export function academicCreate(name, hobby) {
  // TODO:
  return {
    academicId: 111,
  };
}

/**
 * Some description
 *
 * @param {number} academicId
 * @param {string} name
 * @param {string} description
 * @returns {{courseId: number}}
 */
export function courseCreate(academicId, name, description) {
  // TODO
  return {
    courseId: 123,
  };
}

/**
 * Some documentation
 */
export function academicDetails(academicId, academicToViewId) {
  // TODO
  return {
    academic: {
      name: 'Aya',
      hobby: 'music',
    }
  };
}

export function courseDetails(academicId, courseId) {
  // TODO
  return {
    course: {
      name: 'COMP1531',
      description: 'Software Engineering Fundamentals',
      staffMembers: [
        {
          name: 'Ben',
          hobby: 'boxing',
        },
      ],
      allMembers: [
        {
          name: 'Ben',
          hobby: 'boxing',
        },
        {
          name: 'Cid',
          hobby: 'novel',
        },
      ],
    }
  };
}

export function academicsList(academicId) {
  // TODO
  return {
    academics: [
      {
        academicId: 111,
        academicName: 'Dan',
      },
      {
        academicId: 222,
        academicName: 'Eve',
      },
    ]
  };
}

export function coursesList(academicId) {
  // TODO
  return {
    courses: [
      {
        courseId: 123,
        courseName: 'Course 1',
      },
      {
        courseId: 234,
        courseName: 'Course 2',
      },
    ]
  };
}

export function clear() {
  // TODO
  return {};
}
