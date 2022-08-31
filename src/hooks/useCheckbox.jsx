import { useState } from 'react'

const useCheckbox = (initialChecked = false) => {
  const [checked, setChecked] = useState(initialChecked)

  const onChange = _event => {
    setChecked(prevChecked => !prevChecked)
  }

  return [checked, onChange, setChecked]
}

export default useCheckbox
