import PropTypes from 'prop-types'
import cx from 'classnames'

const Checkbox = ({
  hasMessage,
  isChecked,
  handleChange,
  label,
  name,
  anchorText,
}) => {
  const textClasses = cx('checkbox-label', {
    tiny: hasMessage,
    notes: !hasMessage,
  })

  return (
    <label className="checkbox" htmlFor={name}>
      <input
        className="checkbox-input"
        type="checkbox"
        id={name}
        name={name}
        value={name}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="checkbox-icon notes">
        [<span className="checkbox-iconCheck">X</span>]
      </span>
      {anchorText ? (
        <a href={anchorText} target="_blank" className={textClasses}>
          {label}
        </a>
      ) : (
        <span className={textClasses}>{label}</span>
      )}
    </label>
  )
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  anchorText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Checkbox
