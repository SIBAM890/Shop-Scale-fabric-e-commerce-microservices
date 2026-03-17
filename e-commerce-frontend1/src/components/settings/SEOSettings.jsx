import React,{useState} from "react"
import InputField from "../ui/InputField"

export default function SEOSettings(){

const [metaTitle,setMetaTitle]=useState("")
const [metaDescription,setMetaDescription]=useState("")

return(

<div className="settings-card">

<h3>SEO Settings</h3>

<InputField
label="Meta Title"
value={metaTitle}
onChange={setMetaTitle}
/>

<InputField
label="Meta Description"
value={metaDescription}
onChange={setMetaDescription}
/>

</div>

)
}