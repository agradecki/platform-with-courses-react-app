U¿ytkownicy:
1.
  Login: User
  Has³o: 123456

2.
  Login: Admin
  Has³o: ******


-----------------------------------------------

Base url: http://localhost:8000

Endpoint: '/users'

1. Metoda POST (logowanie u¿ytkownika):
  body: {
    login: string,
    password: string,
  }

  responses:
    - status: 404, message: 'U¿ytkownik o podanym loginie nie istnieje'
    - status: 401, message: 'Has³o lub login siê nie zgadza',
    - status: 200, data: user(object)
    - status: 500, message: 'Oops! Coœ posz³o nie tak, przy metodzie POST w endpointcie /users'

2. Metoda PATCH (zakup kursu):
  body: {
    login: string,
    courseId: string,
  }

  responses:
    - status: 404, message: 'Nie znaleziono kursu o podanym Id'
    - status: 404, message: 'Nie znaleziono uzytkownika o podanym loginie',
    - status: 200, data: user(object)
    - status: 403, message: 'Uzytkownik nie posiada wystarczaj¹cych funduszy',
    - status: 202, data: user(object)
    - status: 500, message: 'Oops! Coœ posz³o nie tak, przy metodzie PATCH w endpointcie /users'

Endpoint: '/courses'

1. Metoda GET (pobranie wszystkich kursów)

  responses:
    - status: 200, data: courses(object[])
    - status: 500, message: 'Oops! Coœ posz³o nie tak, przy metodzie GET w endpointcie /courses'

2. Metoda PUT (przes³anie zaktualizowanego kursu)
  body: {
    authors: string[],
    id: string,
    img: string,
    price: number,
    title: string,
  }

  responses:
    - status: 400, message: 'Nie podano wszystkich wymaganych informacji'
    - status: 404, message: 'Nie znaleziono kursu o podanym id'
    - status: 202, data: courses(object[])
    - status: 500, message: 'Oops! Coœ posz³o nie tak, przy metodzie PUT w endpointcie /courses'

3. Metoda POST (tworzenie nowego kursu)
  body: {
    authors: string[],
    img: string,
    price: number,
    title: string,
  }

  responses:
    - status: 400, message: 'Nie podano wszystkich wymaganych informacji'
    - status: 409, message: 'Istnieje ju¿ w bazie kurs ${title}'
    - status: 201, data: courses(object[])
    - status: 500, message: 'Oops! Coœ posz³o nie tak, przy metodzie POST w endpointcie /courses'

4. Metoda DELETE (usuwanie kursu)
  params: '/courses/:id'

  responses:
    - status: 404, message: 'Nie znaleziono kursu o podanym id'
    - status: 200
    - status: 500, message: 'Oops! Coœ posz³o nie tak, przy metodzie DELETE w endpointcie /courses/:id'

5. Metoda GET (pobranie pojedyñczego kursu)
  params: '/courses/:id'

  responses:
    - status: 200, data: course(object)
    - status: 500, message: 'Oops! Coœ posz³o nie tak, przy metodzie GET w endpointcie /courses/:id'