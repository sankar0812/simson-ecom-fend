import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, selectCurrentUser } from "@modules/Auth/authSlice";
import SignInForm from "./SignInForm";
import { OpenNotification } from "@components/common";
import { LoginBackground, LoginPointingBoy } from "@assets/images";
import { baseRequest } from "@request/request";
import { APIURLS } from "@request/apiUrls/urls";
import { toast } from "react-toastify";
import LoginImg from '@assets/images/Shirts/loginImg.jpg'

export const Wrapperj = styled.div`
  height: 100vh;
  /* background-image: url(${LoginBackground}); */
  background-image: url(${LoginImg});
width: 100%;
  /* background-repeat: no-repeat; */
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInCard = styled.div`
  background-color: red;
  backdrop-filter: blur(1px);
  padding: 40px 32px;
  /* border-radius:0px 40px 0px 40px; */
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  /* max-width: 450px;
  width: 100%; */
  width: 50%;
  margin: auto;
  position: relative;
  /* height: 50%; */
  border: 2px solid #949292;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const StyledLoginBoy = styled.div`
  img {
    top: -15%;
    left: -9%;
    width: 25%;
    

    @media screen and (max-width: 768px) {
      /* display: none; */
      /* width: 45%; */
      margin: auto;
    }
  }
`;
const FormStyle = styled.div`
  width: 40%;
  background-color: #fff;
  padding: 20px;
  position: relative;
  justify-content:center;
  border-radius: 25px;
  background: rgba(182, 179, 179, 0.795);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const UserSignin = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data) => {
    setIsLoading(true)
    try {
      const authData = await baseRequest.post(`${APIURLS.LOGIN}`, {
        ...data,
      })
      // Mock API, add the origin API and payload data
      if (authData?.data !== '') {

        localStorage.setItem('persist', JSON.stringify(authData?.data))
        dispatch(setCredentials(authData.data))
        OpenNotification({
          type: 'success',
          msg: `Welcome Back ${authData.data?.roleName}`
        })
        navigate('/',{ replace: true })
        // navigate('/', { replace: true })

      }
      else {
        toast.error('UserName or Password is incorrect !')
      }
    } catch (error) {
      toast.error('Getting error while login, Please Login Again')
      // toast.error('Network error: Unable to connect to the server !')
      // console.error('Getting error while login', error)
      setIsLoading(false)
    }finally{
      setIsLoading(false)
    }
  }
  // console.log(authData,'authDataauthDataauthData');

  const token = useSelector(selectCurrentUser);

  useEffect(() => {
    if (token) {
      // if()
      navigate("/signin");
    }
  }, [token]);

  return (
    <Wrapperj>
      {/* <SignInCard> */}
      {/* <StyledLoginBoy>
          <img src={LoginPointingBoy} style={{ position: "absolute" }} />
        </StyledLoginBoy> */}
      <br />

      <FormStyle>
        {/* <div style={{marginTop:'50px'}}> */}
        <StyledLoginBoy>
          <img src={LoginPointingBoy} style={{ position: "absolute" }} />
        </StyledLoginBoy>
        <SignInForm handleSignIn={handleSignIn} isLoading={isLoading}/>
        {/* </div> */}
      </FormStyle>
      {/* </SignInCard> */}
    </Wrapperj>
  );
};
export default UserSignin;
