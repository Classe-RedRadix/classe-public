import imageCourseJS from '/public/images/curso-javascript.jpg'
import imageCourseReact from '/public/images/curso-front.jpg'
import imageCourseBack from '/public/images/curso-back.jpg'
import imageCourseUIDeveloper from '/public/images/curso-maqueta.jpg'

const PROGRAMACION = {
  id: 'programacion',
  isFeatured: false,
  isPublic: false,
  href: '/courses/programacion',
  information: {
    title: 'Programación con JavaScript',
    start: '21.08.22',
    finish: '25.08.22',
    schemaDescription: 'course:js-schema-description',
    description: 'course:js-description',
    image: {
      source: imageCourseJS,
      alt: 'Un chico de perfil trabajando con su portátil',
    },
    price: 600,
    hours: 30,
    places: 15,
    practical: 80,
  },
  dosier: '/courses/programacion-javascript.pdf',
  indexItems: [
    {
      number: '01',
      name: 'course:js-01-title',
      description: 'course:js-01-description',
    },
    {
      number: '02',
      name: 'course:js-02-title',
      description: 'course:js-02-description',
    },
    {
      number: '03',
      name: 'course:js-03-title',
      description: 'course:js-03-description',
    },
    {
      number: '04',
      name: 'course:js-04-title',
      description: 'course:js-04-description',
    },
    {
      number: '',
      name: 'course:js-05-title',
      description: 'course:js-05-description',
    },
  ],
  objectives: {
    learn: 'course:js-learn',
    text: 'course:js-learn-description',
    objectives: 'course:js-objectives',
    objectivesText: 'course:js-objetives-description',
  },
}

const UI_DEV = {
  id: 'uidev',
  isFeatured: false,
  isPublic: true,
  href: '/courses/maqueta',
  information: {
    title: 'Maquetación con HTML y CSS',
    start: '21.08.22',
    finish: '25.08.22',
    schemaDescription: 'course:ui-dev-schema-description',
    description: 'course:ui-dev-description',
    image: {
      source: imageCourseUIDeveloper,
      alt: 'Un chico de perfil trabajando con su portátil',
    },
    price: 600,
    hours: 30,
    places: 15,
    practical: 80,
  },
  dosier: '/courses/maquetacion-con-HTML-CSS.pdf',
  indexItems: [
    {
      number: '01',
      name: 'course:ui-dev-01-title',
      description: 'course:ui-dev-01-description',
    },
    {
      number: '02',
      name: 'course:ui-dev-02-title',
      description: 'course:ui-dev-02-description',
    },
    {
      number: '03',
      name: 'course:ui-dev-03-title',
      description: 'course:ui-dev-03-description',
    },
    {
      number: '04',
      name: 'course:ui-dev-04-title',
      description: 'course:ui-dev-04-description',
    },
    {
      number: '05',
      name: 'course:ui-dev-05-title',
      description: 'course:ui-dev-05-description',
    },
  ],
  objectives: {
    learn: 'course:ui-dev-learn',
    text: 'course:ui-dev-learn-description',
    objectives: 'course:ui-dev-objectives',
    objectivesText: 'course:ui-dev-objetives-description',
  },
}

const FRONT_END = {
  id: 'data',
  isFeatured: false,
  isPublic: true,
  href: '/courses/front-end',
  information: {
    title: 'Front-end con React',
    start: '21.08.22',
    finish: '25.08.22',
    schemaDescription: 'course:front-react-schema-description',
    description: 'course:front-react-description',
    image: {
      source: imageCourseReact,
      alt: 'Un chico con un gorro trabajando en su portátil',
    },
    price: 1200,
    hours: 30,
    places: 20,
    practical: 80,
  },
  dosier: '/courses/front-end-con-react.pdf',
  indexItems: [
    {
      number: '01',
      name: 'course:front-react-01-title',
      description: 'course:front-react-01-description',
    },
    {
      number: '02',
      name: 'course:front-react-02-title',
      description: 'course:front-react-02-description',
    },
    {
      number: '03',
      name: 'course:front-react-03-title',
      description: 'course:front-react-03-description',
    },
    {
      number: '',
      name: 'course:front-react-04-title',
      description: 'course:front-react-04-description',
    },
  ],
  objectives: {
    learn: 'course:front-react-learn',
    text: 'course:front-react-learn-description',
    objectives: 'course:front-react-objectives',
    objectivesText: 'course:front-react-objetives-description',
  },
}

const BACK_END = {
  id: 'full-stack',
  isFeatured: true,
  isPublic: false,
  href: '/courses/back-end',
  information: {
    title: 'Back-end con Node',
    start: '21.08.22',
    finish: '25.08.22',
    schemaDescription: 'course:back-node-schema-description',
    description: 'course:back-node-description',
    image: {
      source: imageCourseBack,
      alt: 'Un chico con un gorro trabajando en su portátil',
    },
    price: 600,
    hours: 30,
    places: 15,
    practical: 80,
  },
  dosier: '/courses/back-end-con-node.pdf',
  indexItems: [
    {
      number: '01',
      name: 'course:back-node-01-title',
      description: 'course:back-node-01-description',
    },
    {
      number: '02',
      name: 'course:back-node-02-title',
      description: 'course:back-node-02-description',
    },
    {
      number: '03',
      name: 'course:back-node-03-title',
      description: 'course:back-node-03-description',
    },
    {
      number: '04',
      name: 'course:back-node-04-title',
      description: 'course:back-node-04-description',
    },
    {
      number: '05',
      name: 'course:back-node-05-title',
      description: 'course:back-node-05-description',
    },
    {
      number: '',
      name: 'course:back-node-06-title',
      description: 'course:back-node-06-description',
    },
  ],
  objectives: {
    learn: 'course:back-node-learn',
    text: 'course:back-node-learn-description',
    objectives: 'course:back-node-objectives',
    objectivesText: 'course:back-node-objetives-description',
  },
}

const COURSES = [PROGRAMACION, UI_DEV, FRONT_END, BACK_END]

export default COURSES
