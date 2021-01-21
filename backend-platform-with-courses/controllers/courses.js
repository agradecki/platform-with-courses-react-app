const { v4: uuid } = require('uuid');

const coursesData = [
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/1673856_ff13_5.jpg',
    price: 69.99,
    title: 'Web developer od podstaw w 15 dni',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/1844944_e2f8_3.jpg',
    price: 69.99,
    title: 'Zaawansowany front-end w 15 dni',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/1916892_601a.jpg',
    price: 69.99,
    title: 'Programowanie w JavaScript',
  },
  {
    authors: ['Bartłomiej Borowczyk', 'Mateusz Domański'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/2049385_9a8c.jpg',
    price: 69.99,
    title: 'React od podstaw - teoria i praktyka',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/2330558_0de2_2.jpg',
    price: 69.99,
    title: 'Backend - Node.js, Express i MongoDB',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/2331806_b90c_2.jpg',
    price: 69.99,
    title: '(Zaawansowane) Projekty w CSS i JavaScript',
  },
  {
    authors: ['Bartłomiej Borowczyk'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/2258904_bd66_4.jpg',
    price: 0,
    title: 'Wprowadzenie do Git i GitHub',
  },
  {
    authors: ['Bartłomiej Borowczyk', 'Mateusz Domański', 'Michał Dziedziński', 'Kacper Sieradziński'],
    id: uuid(),
    img: 'https://img-a.udemycdn.com/course/240x135/3428814_eee3_4.jpg',
    price: 69.99,
    title: 'Programowanie obiektowe w JavaScript - opanuj, tworząc gry!'
  }
];

exports.getCourses = (request, response, next) => {
  try {
    response.status(200).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses',
    });
  }
};

exports.getCourse = (request, response, next) => {
  try {
    const { id } = request.params;
    const courseToSend = coursesData.find(course => course.id === id);

    if (!courseToSend) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    response.status(200).json({
      course: courseToSend, 
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses/:id',
    })
  }
};

exports.postCourse = (request, response, next) => {
  try {
    const { authors, img, price, title } = request.body;
    if ( !authors || !price || !title ) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const isCourseExist = coursesData.some(({title: currentTitle}) => currentTitle === title);
    if (isCourseExist) {
      response.status(409).json({
        message: `Istnieje już w bazie kurs ${title}`,
      });

      return;
    }

    const newCourse = {
      authors: authors,
      id: uuid(),
      img,
      price,
      title,
    };

    coursesData.push(newCourse);

    response.status(201).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /courses'
    });
  }
};

exports.putCourse = (request, response, next) => {
  try {
    const { authors, id, price, title } = request.body;
    if (!authors || !id || !price || !title) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const indexCourseToUpdate = coursesData.findIndex(course => course.id === id);
    if (indexCourseToUpdate === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }
    
    
    coursesData.splice(indexCourseToUpdate, 1, request.body);

    response.status(202).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /courses'
    });
  }
};

exports.deleteCourse = (request, response, next) => {
  try {
    const { id } = request.params;

    console.log(id);
    const indexCourseToDelete = coursesData.findIndex(course => course.id === id);

    if (indexCourseToDelete === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    coursesData.splice(indexCourseToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /courses/:id',
    });
  }
};

exports.coursesData = coursesData;