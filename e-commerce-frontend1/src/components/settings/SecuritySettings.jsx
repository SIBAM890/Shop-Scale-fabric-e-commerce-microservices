import React,{useState} from "react"
import ToggleSwitch from "../ui/ToggleSwitch"

export default function SecuritySettings(){

const [twoFactor,setTwoFactor]=useState(false)

return(

<div className="settings-card">

<h3>Security Settings</h3>

<ToggleSwitch
label="Enable Two Factor Authentication"
checked={twoFactor}
onChange={setTwoFactor}
/>

</div>

)
}