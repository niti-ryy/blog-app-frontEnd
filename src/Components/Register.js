
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const Register = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       password: Yup.string()
//         .required('Password is required')
//         .min(10, 'Password should be greater than 10 characters'),
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <label htmlFor="email">Email Address</label>
//         <br />
//         <input
//           id="email"
//           type="email" // Change type to "email"
//           {...formik.getFieldProps('email')}
//         />
//         <br />
//         {formik.touched.email && formik.errors.email ? (
//           <p>{formik.errors.email}</p>
//         ) : null}
//         <label htmlFor="password">Enter your password </label>
//         <br />
//         <input
//           id="password"
//           type="password" // Change type to "password"
//           {...formik.getFieldProps('password')}
//         />
//         <br />
//         {formik.touched.password && formik.errors.password ? (
//           <p>{formik.errors.password}</p>
//         ) : null}
//         <input type="submit" />
//         <br />
//       </form>
//     </div>
//   );
// };




// export default Register
import React from 'react'
import validator from "validator"
import * as Yup from "yup"
import {Formik} from "formik"
import {isStrongPassword} from "validator"
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
            setTimeout(()=>{
                alert(values.email)
                setSubmitting(false)
            },1000)
        }}>
            {formik=>(
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Username</label><br/>
                    <input type="username" id="username" {...formik.getFieldProps("username")}/><br/>
                    {formik.touched.username && formik.errors.username ?(
                        <div>
                            <p>{formik.errors.username}</p><br/>
                        </div>
                    ):null}
                    <label htmlFor="email">Enter your email</label><br/>
                    <input type="email" id="email" {...formik.getFieldProps("email")}/><br/>
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
                    <textarea type="bio" id="bio" {...formik.getFieldProps("bio")}/><br/>
                    {formik.touched.bio && formik.errors.bio ?(
                        <div>
                            <p>{formik.errors.bio}</p><br/>
                        </div>
                    ):null}
                    
                </form>
            )}
       </Formik>
    </div>
  )
}

export default Register