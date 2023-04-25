import IMAGES from './images'

const javascriptCourseImage = IMAGES.JAVASCRIPT_COURSE_IMAGE
const frontCourseImage = IMAGES.FRONT_COURSE_IMAGE
const backCourseImage = IMAGES.BACK_COURSE_IMAGE
const uiDevelopmentCourseImage = IMAGES.UI_DEVELOPMENT_COURSE_IMAGE

const DESARROLLO = {
  id: 'desarrollo',
  isFeatured: true,
  isPublic: false,
  href: '/cursos/desarrollo',
  information: {
    title: 'course:js-title',
    titleLongDesc: 'course:js-title',
    titleModal: 'course:js-title-modal',
    start: '16.01.23',
    finish: '02.02.23',
    schemaStartTime: '16:30:00',
    schemaEndTime: '19:00:00',
    schedule: '16:30 - 19:00',
    metaDescription: 'course:js-meta-description',
    description: 'course:js-description',
    image: javascriptCourseImage,
    schemaImage: 'course:js-schema-url-image',
    price: 600,
    hours: 30,
    places: 15,
    practical: 80,
  },
  dosier: '/cursos/desarrollo-con-javascript.pdf',
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
      number: '05',
      name: 'course:js-05-title',
      description: 'course:js-05-description',
    },
    {
      number: '06',
      name: 'course:js-06-title',
      description: 'course:js-06-description',
    },
    {
      number: '',
      name: 'course:js-optional-title',
      description: 'course:js-optional-description',
    },
    {
      number: '',
      name: 'course:js-prework-title',
      description: 'course:js-prework-description',
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
  id: 'maquetacion',
  isFeatured: false,
  isPublic: false,
  href: '/cursos/maquetacion',
  information: {
    title: 'course:ui-dev-title',
    titleLongDesc: 'course:ui-dev-title-long-desc',
    titleModal: 'course:ui-dev-title-modal',
    start: '13.02.23',
    finish: '06.03.23',
    schemaStartTime: '16:30:00',
    schemaEndTime: '19:00:00',
    schedule: '16:30 - 19:00',
    metaDescription: 'course:ui-dev-meta-description',
    description: 'course:ui-dev-description',
    image: uiDevelopmentCourseImage,
    schemaImage: 'course:ui-dev-schema-url-image',
    price: 600,
    hours: 30,
    places: 15,
    practical: 80,
  },
  dosier: '/cursos/maquetacion-con-HTML-CSS.pdf',
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
      number: '',
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
  id: 'front-end',
  isFeatured: false,
  isPublic: false,
  href: '/cursos/front-end',
  information: {
    title: 'course:front-react-title',
    titleLongDesc: 'course:front-react-title',
    titleModal: 'course:front-react-title-modal',
    start: '01.01.23',
    finish: '31.12.23',
    schemaStartTime: '18:00:00',
    schemaEndTime: '20:30:00',
    metaDescription: 'course:front-react-meta-description',
    description: 'course:front-react-description',
    image: frontCourseImage,
    schemaImage: 'course:front-react-schema-url-image',
    price: 600,
    hours: 30,
    places: 20,
    practical: 80,
  },
  dosier: '/cursos/front-end-con-react.pdf',
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
    {
      number: '',
      name: 'course:front-react-05-title',
      description: 'course:front-react-05-description',
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
  id: 'back-end',
  isFeatured: false,
  isPublic: false,
  href: '/cursos/back-end',
  information: {
    title: 'course:back-node-title',
    titleLongDesc: 'course:back-node-title',
    titleModal: 'course:back-node-title-modal',
    start: '01.01.23',
    finish: '31.12.23',
    schemaStartTime: '18:00:00',
    schemaEndTime: '20:30:00',
    metaDescription: 'course:back-node-meta-description',
    description: 'course:back-node-description',
    image: backCourseImage,
    schemaImage: 'course:back-node-schema-url-image',
    price: 600,
    hours: 30,
    places: 15,
    practical: 80,
  },
  dosier: '/cursos/back-end-con-node.pdf',
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
    {
      number: '',
      name: 'course:back-node-07-title',
      description: 'course:back-node-07-description',
    },
  ],
  objectives: {
    learn: 'course:back-node-learn',
    text: 'course:back-node-learn-description',
    objectives: 'course:back-node-objectives',
    objectivesText: 'course:back-node-objetives-description',
  },
}

const COURSES = [DESARROLLO, UI_DEV, FRONT_END, BACK_END]

export default COURSES
