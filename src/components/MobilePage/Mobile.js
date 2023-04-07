import "./Mobile.css"
import Filters from "./filters/filter";
import Mobiles from "./MobileComponent/MobileComponent";
function Mobile() {
    return (
        <div>
            <div className="mobilePhoto" >Image Here</div>
            <div className="contentHolder" >
                <div className="mobileFilters" ><Filters /></div>
                <div className="mobileComponent" ><Mobiles /></div>
            </div>
        </div>)
}
export default Mobile;