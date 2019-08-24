import React from 'react';

const Select = (props) => {
  const { value, options, multi = false, onChange } = props;

  return (
    <select onChange={({ target: { value } }) => onChange(value)} defaultValue={value} multiple={multi}>
      {
        options.map(({ value, label }, i) => <option value={value}>{label}</option>)
      }
    </select>
  )
}

export default Select;