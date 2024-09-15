import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors ,updateProfile} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import { useEffect } from "react";
import { loadUser } from "../../actions/userAction";

const UpdateProfile = () => {
  
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [avatar,setAvatar]=useState("")
  const [avatarPeview,setAvatarPreview]=useState("/images/images.png")
 
  const alert =useAlert();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {user} = useSelector((state)=>state.auth);
  const {error,isUpdated,loading}=useSelector((state)=>state.user);
useEffect(()=>{
  if(user){
    setName(user.name);
    setEmail(user.email);
    setAvatarPreview(user.avatar.url);

  }
  if(error){
    alert.error(error);
    dispatch(clearErrors());
  }
  if(isUpdated){
    alert.success("User Updated Successfully");
    dispatch(loadUser());
    navigate("/users/me");
    dispatch({
      type:UPDATE_PROFILE_RESET,
    });
  }

},[dispatch,alert,error,navigate,isUpdated,user]);

const submitHandler =(e)=>{
  e.preventDefault();

  const formData=new FormData();
  formData.set("email",email);
  formData.set("name",name);
  formData.set("avatar",avatar);

  dispatch(updateProfile(formData));
};

  const onChange=(e)=>{
    const reader = new FileReader();
    reader.onload=()=>{
      if(reader.readyState===2){
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5 updateprofile">
          <form className="shadow-lg" 
          encType="multipart/form-data"
           onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Profile</h1>
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPeview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  ></input>
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;