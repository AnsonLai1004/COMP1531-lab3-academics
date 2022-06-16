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
const dataStore = {
  academics: [],
  courses: [],
};

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
  if (name === '' | hobby === '') {
    return { error: 'error' };
  }
  const len = dataStore.academics.length;
  const object = {};
  if (len === 0) {
    object.id = 10;  
  } else {
    const newid = dataStore.academics[len - 1].id + 10;
    object.id = newid;
  }
  object.name = name;
  object.hobby = hobby;
  dataStore.academics.push(object);
  return {
    academicId: object.id,
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
  // check Id
  if (!isValidId(academicId)) {
    console.log("not valid ID");
    return { error: 'error' };
  }
  // check name
  if (!validCourseName(name)) {
    return { error: 'error' };
  }
  const len = dataStore.courses.length;
  const course = {};
  if (len === 0) {
    course.id = 10;
  } else {
    course.id = dataStore.courses[len - 1].id + 10;
  }
  course.name = name;
  course.description = description;
  course.members = [academicId];
  course.staffs = [academicId];
  dataStore.courses.push(course);
  return {
    courseId: course.id,
  };
}
// helper functions
function isValidId(academicId) {
  for (let i of dataStore.academics) {
    if (i.id === academicId) {
      return true;
    } 
  }
  return false;
}

function validCourseName(name) {
  const len = name.length;
  if (len !== 8) {
    return false;
  }
  for (let i = 0; i < 4; i++) {
    if (name.charAt(i) !== name.charAt(i).toUpperCase()) {
      console.log("Uppercase part")
      return false;
    }
  }
  for (let i = 4; i < 8; i++) {
    if (isNaN(parseInt(name.charAt(i)))) {
      return false;
    }
  }
  return true;
}

function validCourseId(courseId) {
  for (let element of dataStore.courses) {
    if (element.id === courseId) {
      return true;
    }
  }
  return false;
}

/**
 * Some documentation
 */
export function academicDetails(academicId, academicToViewId) {
  // TODO
  if (!isValidId(academicId) || !isValidId(academicToViewId)) {
    return { error: 'error' };
  }
  const academic = dataStore.academics;
  for(let element of academic) {
    if (element.id === academicToViewId) {
      return { name: element.name, hobby: element.hobby};
    }
  }
}

export function courseDetails(academicId, courseId) {
  // TODO
  if (!isValidId(academicId)) {
    return { error: 'error'};
  }
  for (let element of dataStore.courses) {
    if (element.id === courseId) {
      return {
        course:{
          name: element.name,
          description: element.description,
          staffMembers: element.staffs,
          allMembers: element.members,
        }
      }
    }
  }
  return { error: 'error' };
 /* return {
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
  };*/
}

export function academicsList(academicId) {
  // TODO
  if (!isValidId(academicId)) {
    return { error: 'error' };
  }
  const academics = [];
  for (let element of dataStore.academics) {
    let object = {
      academicId: element.id,
      academicName: element.name,
    }
    academics.push(object);
  }
  
  return academics;
  /*return {
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
  };*/
}

export function coursesList(academicId) {
  // TODO
  if (!isValidId(academicId)) {
    return { error: 'error' }
  }
  const courses = [];
  for (let element of dataStore.courses) {
    const object = {
      courseId: element.id,
      courseName: element.name,
    }
    courses.push(object);
  }
  
  return { courses };
  /*return {
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
  };*/
}

export function clear() {
  // TODO
  return {};
}
/*
console.log(academicCreate('Ben', 'football'));
console.log(courseCreate(10, 'Comp2521', 'ABCDEFG'));
console.log(dataStore.courses);
console.log(dataStore.academics);*/
console.log('academicCreate:')
console.log(academicCreate('Bob', 'eat'));
console.log(academicCreate('Ada', 'chess'));
console.log();
//console.log(courseCreate(10, 'COMP1531', 'ABCDEFG'));
//console.log(academicDetails(100, 20));
//console.log(courseDetails(10,10));
console.log('academicsList return: ')
console.log(academicsList(10));
//console.log(coursesList(10));
//console.log(academicDetails(10, 20));
