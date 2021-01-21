const { coursesData } = require('./courses');

const usersData = [
  {
    accessLevel: 0,
    budget: 150,
    courses: [
      coursesData[0].id,
      coursesData[1].id,
      coursesData[2].id,
    ],
    login: 'User',
    password: '123456',
  },
  {
    accessLevel: 1,
    budget: 1000000,
    courses: [
      coursesData.map(course => course.id)
    ],
    login: 'Admin',
    password: '******',
  }
];

exports.postUser = (request, response, next) => {
  try {
    const { login, password } = request.body;

    const user = usersData.find(u => u.login === login);
    if (!user) {
      response.status(404).json({
        message: 'Użytkownik o podanym loginie nie istnieje',
      });
  
      return;
    }

    const isPasswordCorrect = user.password === password;
    if (!isPasswordCorrect) {
      response.status(401).json({
        message: 'Hasło lub login się nie zgadza',
      });

      return;
    }

    response.status(200).json({
      user,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /users',
    });
  }
};

exports.patchUser = (request, response, next) => {
  try {
    const { login, courseId } = request.body;

    const course = coursesData.find(course => course.id === courseId);
    const user = usersData.find(user => user.login === login);

    if (!course) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym Id',
      });

      return;
    } else if (!user) {
      response.status(404).json({
        message: 'Nie znaleziono uzytkownika o podanym loginie',
      });

      return;
    }

    const hasUserCourseAlready = user.courses.some(id => id === courseId);
    if (hasUserCourseAlready) {
      response.status(200).json({
        user,
      });

      return;
    }

    const hasUserEnoughtMoney = user.budget - course.price >= 0;
    if (!hasUserEnoughtMoney) {
      response.status(403).json({
        message: 'Uzytkownik nie posiada wystarczających funduszy',
      });

      return;
    }

    user.budget = Number((user.budget - course.price).toFixed(2));
    user.courses.push(courseId);
    response.status(202).json({
      user,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie PATCH w endpointcie /users',
    });
  }
};