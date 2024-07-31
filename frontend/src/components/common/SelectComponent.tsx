import React from 'react'
import Select, { StylesConfig, ActionMeta, GetOptionLabel,  GetOptionValue,  } from 'react-select';
import { Label } from '@/components/ui/label';

type ActionTypes = | 'clear' | 'create-option' | 'deselect-option' | 'pop-value' | 'remove-value' | 'select-option' | 'set-value'


type CommonProps<T> = {
    value:T | T[] | undefined | null,
    isMulti?: boolean,
    options: T[],
    selectOption?: (option:T) => void,
    selectProps?: any,
    setValue?: (value:T, action:ActionTypes) => void,
    emotion?: any,
    onChange:(newValue: any | null, actionMeta: ActionMeta<T>) => void 
    getOptionLabel?: GetOptionLabel< T > | undefined,
    getOptionValue?: GetOptionValue< T > | undefined
    label:string
  }

  export const customStyles = {
    control: (provided:any,state:any) => ({
        ...provided,
        width: "100%", // Làm cho control phủ toàn bộ chiều rộng
        border:"1px solid #e2e8f0",
        boxShadow:'none' ,
        '&:hover': {
          borderColor: "#e2e8f0", // Border color on hover
          boxShadow:'0px 0px 0px 1px #000' 
        },
        
        cursor:"pointer",
    }),
    dropdownIndicator: () => ({
        display: "none", // Ẩn con trỏ xuống
    }),
    indicatorSeparator: () => ({
        display: "none", // Ẩn đường ngăn cách
    }),
};


const SelectComponent = <T,>({value,onChange,isMulti = false,label,getOptionLabel,getOptionValue,options}:CommonProps<T>) => {

  return (
    <div>
      {label && <Label>{label}</Label>}
      <Select 
        isClearable
        value={value}
        onChange={onChange}
        isMulti={isMulti}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        classNamePrefix="react-select"
        styles={customStyles}
        // classNames={customStyles}
      />
    </div>
  )
}

export default SelectComponent