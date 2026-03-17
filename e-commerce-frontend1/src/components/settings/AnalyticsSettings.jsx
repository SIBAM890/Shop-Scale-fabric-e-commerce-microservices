import React,{useState} from "react"
import InputField from "../ui/InputField"

export default function AnalyticsSettings(){

const [googleId,setGoogleId]=useState("")

return(

<div className="settings-card">

<h3>Analytics Settings</h3>

<InputField
label="Google Analytics ID"
value={googleId}
onChange={setGoogleId}
/>

</div>

)
}