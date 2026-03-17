import React,{useState} from "react"
import ToggleSwitch from "../ui/ToggleSwitch"
import InputField from "../ui/InputField"

export default function PaymentSettings(){

const [razorpay,setRazorpay]=useState(false)
const [stripe,setStripe]=useState(false)
const [apiKey,setApiKey]=useState("")

return(

<div className="settings-card">

<h3>Payment Settings</h3>

<ToggleSwitch
label="Enable Razorpay"
checked={razorpay}
onChange={setRazorpay}
/>

<ToggleSwitch
label="Enable Stripe"
checked={stripe}
onChange={setStripe}
/>

<InputField
label="API Key"
value={apiKey}
onChange={setApiKey}
/>

</div>

)
}