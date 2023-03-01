import PropTypes from 'prop-types'
import cx from 'classnames'

import CookiesLayer from '../cookies/Cookies'
import InfoHead from '../info-head/InfoHead'
import { CoursePropType } from 'ui/sharedProptypes'

const MainWrapper = ({
  extraClass,
  isBlack,
  isFluor,
  isLock,
  children,
  isCourseOpen,
  course,
}) => {
  const classes = cx('mainWrapper', `${extraClass ? extraClass : ''}`, {
    'is-black': isBlack,
    'is-fluor': isFluor,
    'is-lock': isLock,
  })
  return (
    <>
      <InfoHead isCourseOpen={isCourseOpen} course={course} />
      <div className={classes}>
        {children}
        <CookiesLayer isBlack={isBlack} />
      </div>
    </>
  )
}

MainWrapper.propTypes = {
  extraClass: PropTypes.string,
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool,
  isLock: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isCourseOpen: PropTypes.bool,
  course: CoursePropType,
}

export default MainWrapper
