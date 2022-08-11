import PropTypes from 'prop-types'
import cx from 'classnames'
import useTranslations from '../../../hooks/useTranslations'
import Cell from '../cell/Cell'

const MenuDesktop = ({
  isBlack,
  isFluor,
  openCourses,
  openContact,
  courses,
}) => {
  const formatMessage = useTranslations()
  const classes = cx('menuDesktop', {
    'is-black': isBlack,
    'is-fluor': isFluor,
  })

  return (
    <header className={classes}>
      <Cell isNegative={isBlack}>
        <a href="/" className="menuDesktop-claim menu">
          {formatMessage('menu:claim')}
        </a>
        <button
          className="menuDesktop-button menu"
          onClick={openCourses}
          aria-label={formatMessage('menu:courses')}
          role="link"
        >
          <span className="menu-textButton">
            [
            <span className="bracketHover">
              {courses < 10 ? `0${courses}` : courses}
            </span>
            ] {formatMessage('menu:courses')}
          </span>
        </button>
        <button
          onClick={openContact}
          className="menuDesktop-link menu"
          aria-label={formatMessage('menu:contact')}
          role="link"
        >
          <span>{formatMessage('menu:contact')}</span>
        </button>
      </Cell>
    </header>
  )
}

MenuDesktop.propTypes = {
  isBlack: PropTypes.bool,
  isFluor: PropTypes.bool,
  openCourses: PropTypes.func.isRequired,
  openContact: PropTypes.func.isRequired,
  courses: PropTypes.number.isRequired,
}

export default MenuDesktop
