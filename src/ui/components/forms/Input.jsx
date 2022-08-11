import PropTypes from 'prop-types'
import cx from 'classnames'
import ArrowIcon from './../../../assets/icons/ArrowIcon'

const Input = ({
  handleBlur,
  handleChange,
  name,
  placeholder,
  type,
  value,
  isRounded,
  isUppercase,
  isNegative,
  id,
}) => {
  const classes = cx('input', {
    'is-rounded': isRounded,
    'is-uppercase': isUppercase,
    'is-negative': isNegative,
  })

  return (
    <div className={classes}>
      <input
        className="input-field"
        onBlur={handleBlur}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        id={id}
      />
    </div>
  )
}

Input.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'text']).isRequired,
  value: PropTypes.string.isRequired,
  isRounded: PropTypes.bool,
  isUppercase: PropTypes.bool,
  isNegative: PropTypes.bool,
  id: PropTypes.string,
}

export default Input
