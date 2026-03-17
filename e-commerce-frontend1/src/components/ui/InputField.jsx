import React from "react";

export default function InputField({
  label,
  value,
  onChange,
  type="text",
  placeholder=""
}){

return(

<div className="ui-field">

{label && <label>{label}</label>}

<input
type={type}
value={value}
placeholder={placeholder}
onChange={(e)=>onChange(e.target.value)}
/>

</div>

)

}