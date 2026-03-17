import React,{useState} from "react"
import ToggleSwitch from "../ui/ToggleSwitch"

export default function SystemSettings(){

const [maintenance,setMaintenance]=useState(false)

return(

<div className="settings-card">

<h3>System Settings</h3>

<ToggleSwitch
label="Maintenance Mode"
checked={maintenance}
onChange={setMaintenance}
/>

</div>

)
}