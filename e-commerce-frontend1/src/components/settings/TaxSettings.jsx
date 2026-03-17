import React,{useState} from "react"
import InputField from "../ui/InputField"

export default function TaxSettings(){

const [taxRate,setTaxRate]=useState("")

return(

<div className="settings-card">

<h3>Tax Settings</h3>

<InputField
label="Tax Percentage"
type="number"
value={taxRate}
onChange={setTaxRate}
/>

</div>

)
}