import React, {useState} from 'react';
 

const Forms = ({user, HandleSubmit, handleChange_form, isSignup})=>{
 
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (<form onSubmit={HandleSubmit}>

        
        {isSignup==="signup" && <div class="form-floating ">
            <input type="text" value={user.fullName} name="fullName" onChange={handleChange_form} className="form-control firstInputofUser"  placeholder="Full Name"  autoComplete="off" />
            <label htmlFor="floatingInput">Full Name</label>
        </div>}
        
        <div class="form-floating ">
            <input type="text" value={user.username} name="username" onChange={handleChange_form} className={isSignup === "signup" ? "form-control midInputofUser" :"form-control firstInputofUser"} id="floatingInput" placeholder="username" autoComplete="off" />
            <label htmlFor="floatingInput">Username</label>
        </div>
        <div class="form-floating ">
            <input type={passwordShown ? "text" : "password"} value={user.password} onChange={handleChange_form} name="password" className={isSignup === "signup" ? "form-control midInputofUser" : "form-control lastInputofUser"} id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
            <i className={passwordShown?"fa fa-eye-slash":"fa fa-eye"} onClick={togglePasswordVisiblity}  aria-hidden="true"></i>            
            
        </div>
        

        <div style={{ paddingTop: "10px" }}>
            <button className="w-100 btn btn-lg btn-outline-primary btn-block" type="submit">{isSignup === "signup"? "Signup":"Login"}</button>
        </div>
       
    </form>);
}


export default Forms;