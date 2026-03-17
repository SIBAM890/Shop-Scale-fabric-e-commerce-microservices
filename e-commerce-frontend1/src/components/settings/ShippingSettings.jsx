import React,{useState} from "react"
import InputField from "../ui/InputField"
import ToggleSwitch from "../ui/ToggleSwitch"

export default function ShippingSettings(){

const [freeShipping,setFreeShipping]=useState(false)
const [shippingCost,setShippingCost]=useState("")

return(

<div className="settings-card">

<h3>Shipping Settings</h3>

<ToggleSwitch
label="Enable Free Shipping"
checked={freeShipping}
onChange={setFreeShipping}
/>

<InputField
label="Default Shipping Cost"
type="number"
value={shippingCost}
onChange={setShippingCost}
/>

</div>

)
}