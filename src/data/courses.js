import IMAGES from './images'

const javascriptCourseImage = IMAGES.JAVASCRIPT_COURSE_IMAGE
const frontCourseImage = IMAGES.FRONT_COURSE_IMAGE
const backCourseImage = IMAGES.BACK_COURSE_IMAGE
const uiDevelopmentCourseImage = IMAGES.UI_DEVELOPMENT_COURSE_IMAGE

const DESARROLLO = {
  id: 'desarrollo',
  isFeatured: true,
  isPublic: true,
  href: '/cursos/desarrollo',
  information: {
    title: 'course:js-title',
    titleModal: 'course:js-title-modal',
    start: '21.11.22',
    finish: '16.12.22',
    // startTime & endTime are created for validate schema.org, see useCourseSchema.js
    startTime: '18:00:00',
    endTime: '20:30:00',
    schedule: '18:00 - 20:30',
    metaDescription: 'course:js-schema-description',
    description: 'course:js-description',
    image: javascriptCourseImage,
    price: 700,
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
  id: 'maqueta',
  isFeatured: false,
  isPublic: true,
  href: '/cursos/maqueta',
  information: {
    title: 'course:ui-dev-title',
    titleModal: 'course:ui-title-modal',
    start: '21.11.22',
    finish: '16.12.22',
    // startTime & endTime are created for validate schema.org, see useCourseSchema.js
    startTime: '18:00:00',
    endTime: '20:30:00',
    schedule: '18:00 - 20:30',
    metaDescription: 'course:ui-dev-meta-description',
    description: 'course:ui-dev-description',
    image: uiDevelopmentCourseImage,
    price: 700,
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
    titleModal: 'course:front-react-title-modal',
    start: '21.08.22',
    finish: '25.08.22',
    startTime: '',
    endTime: '',
    metaDescription: 'course:front-react-schema-description',
    description: 'course:front-react-description',
    image: frontCourseImage,
    price: 700,
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
    titleModal: 'course:back-node-title-modal',
    start: '21.08.22',
    finish: '25.08.22',
    startTime: '',
    endTime: '',
    metaDescription: 'course:back-node-schema-description',
    description: 'course:back-node-description',
    image: backCourseImage,
    price: 700,
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
