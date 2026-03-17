import React,{useState} from "react"
import ToggleSwitch from "../ui/ToggleSwitch"

export default function NotificationSettings(){

const [email,setEmail]=useState(true)
const [sms,setSms]=useState(false)

return(

<div className="settings-card">

<h3>Notification Settings</h3>

<ToggleSwitch
label="Email Notifications"
checked={email}
onChange={setEmail}
/>

<ToggleSwitch
label="SMS Notifications"
checked={sms}
onChange={setSms}
/>

</div>

)
}