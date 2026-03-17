import React,{useState} from "react"
import InputField from "../ui/InputField"

export default function EmailSettings(){

const [smtpHost,setSmtpHost]=useState("")
const [smtpPort,setSmtpPort]=useState("")

return(

<div className="settings-card">

<h3>Email Settings</h3>

<InputField
label="SMTP Host"
value={smtpHost}
onChange={setSmtpHost}
/>

<InputField
label="SMTP Port"
value={smtpPort}
onChange={setSmtpPort}
/>

</div>

)
}