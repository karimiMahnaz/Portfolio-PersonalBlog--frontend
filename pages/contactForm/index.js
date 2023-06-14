import React, { useState } from 'react';
import classnames from "classnames";
import { Form, Button, Card, Col, FloatingLabel } from "react-bootstrap";
import { ToastContainer, toast, otherPropsFromToastConfigureas  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import styles from "./contactForm.module.css";

const ContactForm = () => {

    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [today,setToday] = useState(new Date())
    const [contactID, setContactID] = useState(null);

    const [date, setDate] = useState(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+'-'+today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds());
      
     console.log("date", date);

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
   
        const { customerName, customerMail, customerMessage } = form
        const newErrors = {}
        // customerName errors
        if (!customerName || customerName === '') newErrors.customerName = 'cannot be blank!'
        else if (customerName.length > 70) newErrors.customerName = 'name is too long!'
        if (!customerMail || customerMail === '') newErrors.customerMail = 'cannot be blank!'
        // customerMessage errors
        if (!customerMessage || customerMessage === '') newErrors.message = 'cannot be blank!'
        else if (customerMessage.length > 100) newErrors.customerMessage = 'message is too long!'

        return newErrors
    }


    const handleSubmit = async (event) => {
      
        event.preventDefault()
        const form0 = event.currentTarget;
        if (form0.checkValidity() === false) {
            setValidated(false);
            console.log('notvalidated****', validated)
            event.stopPropagation();
        }else{
            setValidated(true);
            console.log('validated****', validated)
        }
     
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
            console.log("errors", errors)
            toast("Please enter valid data!", { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'bottom-right' })
         
        } else {
            console.log("form", form);
           
            try {


              axios({
                method: "post",
                url: "https://api.softestingca.com/api/email",
                data: form,
               
              }).then((response) => {
                if (response.data.status === "Message Sent") {
                  toast.success("Thank you for your feedback!");
                  
                } else if (response.data.status === "ERROR") {
                  toast.error("Error occurred!");
                }
              });
        
          

               /*   const url = process.env.NEXT_PUBLIC_URL;
                 const auth = process.env.NEXT_PUBLIC_CONTACT_AUTH;
              
               
                 console.log('auth', process.env.NEXT_PUBLIC_CONTACT_AUTH)
                 console.log('url', process.env.NEXT_PUBLIC_URL)
                const fetchParams = {
                    method: 'post',
                    url: `${url}/graphql`,
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${auth}`
                    },
                    data: JSON.stringify({
                      query: `
                        {
                          toSendEmails (sort: "contactId:desc" , pagination: { limit: 1 })
                          {
                           data{      
                            attributes {
                              contactId
                              
                                       } 
                                 }
                                    }
                           }
                       `
                    })
                  }
              
                  const res = await axios(fetchParams);
                  console.log('res', res.data.data.toSendEmails.data[0])
                  let temp;
                  res.data.data.toSendEmails.data[0]=== undefined?  temp = undefined :  temp = await res.data.data.toSendEmails.data[0].attributes
                  console.log("temp" , temp)
                   temp === undefined ? setContactID(1):setContactID(parseInt(temp.contactId)) ;
                   console.log("contactId" , contactID)
                  const insertParams = {
                    method: 'post',
                    url: `${url}/graphql`,
                    headers: {
                      'content-type': 'application/json',
                      'Authorization': `Bearer ${auth}`
                    },
                    data: JSON.stringify({
                      query: `
                      mutation {
                        createToSendEmail (data:{ 
                           contactId: "${temp === undefined? 1: parseInt(temp.contactId)+1}",
                           fromEmail: "${form.email}",
                           contactName: "${form.name}",
                           contactMessage: "${form.message}",
                           contactDate:  "${date}"               
                       }){
                        data {
                             attributes {
                               contactId,
                               fromEmail,
                               contactName,
                               contactMessage,
                               contactDate
                               
                             }
                           }
                       }
                       }
                     `
                    })
                  }
            
                   await axios(insertParams);
                  
                   toast.success("Thank you for your feedback!");
                return {
                  props: {
                    result:"Done",

                  }
                } */
              }
              catch (err) {
                console.log('error', err)
                toast.error("Error occurred!");
                return {
                  props: {
                    result:"Error"
            
                  }
                };
            
              }
            
        }
     

    };

    return (
        <Card className={classnames("ml-auto mr-auto", styles.content)}>
           <ToastContainer
             autoClose={5000}
             hideProgressBar={true}
              {...otherPropsFromToastConfigureas}
            />
            
            <Card.Body >
                <h6 className={styles.h6}>Please leave your details below and we’ll response you in the next 24 hours</h6>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Control
                        disabled
                        type="email"
                        placeholder="To:   hello@SofTestingca.com"
                        defaultValue=""
                        style={{ height: '40px' }}
                        className={classnames("mb-3", styles.item)} />



                    <FloatingLabel
                        controlId="emailInput"
                        label="Email address"
                        className={classnames("mb-3", styles.item)}
                    >
                        <Form.Control
                            required
                            type="email"
                            placeholder="name@example.com"
                            defaultValue=""
                            style={{ height: '50px' }}
                            isInvalid={ !!errors.customerMail }
                            onChange={e => setField('customerMail', e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.customerMail}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="nameInput"
                        label="Name"
                        className={classnames("mb-3", styles.item)}
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            defaultValue=""
                            style={{ height: '50px' }}
                            isInvalid={ !!errors.name }
                            onChange={e => setField('customerName', e.target.value)}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.customerName}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Message"
                        className="mb-3"
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a message here"
                            style={{ height: '120px' }}
                            isInvalid={ !!errors.customerMessage }
                            onChange={e => setField('customerMessage', e.target.value)} />
                        <Form.Control.Feedback type='invalid'>
                            {errors.customerMessage}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <Button className={styles.btn} variant="outline-success" type="submit">
                        Submit
                    </Button>
                  
                </Form>
            </Card.Body>
        </Card>
    )

}

export default ContactForm;
