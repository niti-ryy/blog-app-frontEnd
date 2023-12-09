
import React from 'react'
import * as Yup from "yup"
import {Formik} from "formik"
import {isStrongPassword} from "validator"
import axios from "axios"
const Register = () => {
  return (
    <div>
       <Formik 
        initialValues={{username:"",email:"",passwordHash:"",bio:""}}
        validationSchema={Yup.object({
            username:Yup.string().required("username is required"),
            email:Yup.string().required("email is required").email("invalid email address"),
            password:Yup.string()
                .required("password is required")
                .test("custom-validation","password should have atleast 1 special character,Number,Capital letter",(value)=>{
                    if(!isStrongPassword(value)){
                        return false
                    }
                    return true
                }),
            bio:Yup.string().required("bio is required")    
        })}
        onSubmit={(values,{setSubmitting})=>{
            const formData={
                username:values.username,
                email:values.email,
                passwordHash:values.password,
                bio:values.bio,
                createAt:Date.now(),
            }
            axios.post("http://localhost:3046/api/users/register",formData)
            .then((res)=>{console.log(res.data)})
            .catch((e)=>{alert(e.message)})
            setSubmitting(false)
            
        }}>
            {formik=>(
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Username</label><br/>
                    <input type="text" id="username" {...formik.getFieldProps("username")}/><br/>
                    {formik.touched.username && formik.errors.username ?(
                        <div>
                            <p>{formik.errors.username}</p><br/>
                        </div>
                    ):null}
                    <label htmlFor="email">Enter your email</label><br/>
                    <input type="text" id="email" {...formik.getFieldProps("email")}/><br/>
                    {formik.touched.email && formik.errors.email ?(
                        <div>
                            <p>{formik.errors.email}</p><br/>
                        </div>
                    ):null}
                    <label htmlFor="password">Enter your password</label><br/>
                    <input type="password" id="password" {...formik.getFieldProps("password")}/><br/>
                    {formik.touched.password && formik.errors.password ?(
                        <div>
                            <p>{formik.errors.password}</p><br/>
                        </div>
                    ):null}
                    <label htmlFor="bio">Bio</label><br/>
                    <textarea type="text" id="bio" {...formik.getFieldProps("bio")}/><br/>
                    {formik.touched.bio && formik.errors.bio ?(
                        <div>
                            <p>{formik.errors.bio}</p><br/>
                        </div>
                    ):null}
                    <input type="submit"/>
                </form>
            )}
       </Formik>
    </div>
  )
}

export default Register