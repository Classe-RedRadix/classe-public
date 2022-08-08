import PropTypes from 'prop-types'
import cx from 'classnames'

const Cell = ({
  extraClass,
  hasGap,
  hasLinesHidden,
  isAnimated,
  isColumn,
  isNegative,
  children,
}) => {
  const classes = cx('cell', `${extraClass ? extraClass : ''}`, {
    'has-gap': hasGap,
    'has-linesHidden': hasLinesHidden,
    'is-animated': isAnimated,
    'is-column': isColumn,
    'is-negative': isNegative,
  })
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

Cell.propTypes = {
  extraClass: PropTypes.string,
  hasGap: PropTypes.bool,
  hasLinesHidden: PropTypes.bool,
  isAnimated: PropTypes.bool,
  isColumn: PropTypes.bool,
  isNegative: PropTypes.bool,
  children: PropTypes.node,
}

export default Cell
