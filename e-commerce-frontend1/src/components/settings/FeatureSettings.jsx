import React,{useState} from "react"
import ToggleSwitch from "../ui/ToggleSwitch"

export default function FeatureSettings(){

const [reviews,setReviews]=useState(true)
const [wishlist,setWishlist]=useState(true)

return(

<div className="settings-card">

<h3>Feature Settings</h3>

<ToggleSwitch
label="Enable Reviews"
checked={reviews}
onChange={setReviews}
/>

<ToggleSwitch
label="Enable Wishlist"
checked={wishlist}
onChange={setWishlist}
/>

</div>

)
}