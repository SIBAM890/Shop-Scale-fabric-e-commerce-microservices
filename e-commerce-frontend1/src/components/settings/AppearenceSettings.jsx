import React,{useState} from "react"
import SelectField from "../ui/SelectField"

export default function AppearenceSettings(){

const [theme,setTheme]=useState("light")

return(

<div className="settings-card">

<h3>Appearance Settings</h3>

<SelectField
label="Theme"
value={theme}
onChange={setTheme}
options={[
{label:"Light",value:"light"},
{label:"Dark",value:"dark"}
]}
/>

</div>

)
}