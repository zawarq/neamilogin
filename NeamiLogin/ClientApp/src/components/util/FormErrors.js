import React from 'react';

export const FormErrors = ({ formErrors }) =>
    <div className='form-errors'>
        <ul>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <li className="text-danger" key={i}>{formErrors[fieldName]}</li>
                )
            } else {
                return '';
            }
            })}
        </ul>
    </div>