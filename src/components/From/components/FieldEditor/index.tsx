import { useEffect, useState } from "react";
import { Field } from "../../../../classes/field.class.ts";

import { FieldTypes } from "../../../../utils/field-types.utils.js";

export const FieldEditor = ({changeEditStatus,swapFields,target,showUp,index}) => {
    const [fieldName, setFieldName] = useState('');
    const [currentType,setCurrentType] = useState('text');
    const [fieldValue, setFieldValue] = useState();
    const [isRequired, setIsRequired] = useState(false);

    useEffect(() => {
        setFieldName(target.name);
        setCurrentType(target.type);
        setFieldValue(target.value);
        setIsRequired(target.required);
    } , [target])



    const handleOnChangeName = (e) => {
        setFieldName(e.target.value);
    }

    const handleOnChangeFieldTypes = (e) => {
        setCurrentType(e.target.value);
    }

    const handleOnChangeFieldValue = (e) => {
        setFieldValue(e.target.value);
    }

    const handleOnClickApply = () => {
        const newField = new Field(fieldName,currentType,fieldValue,isRequired);

        swapFields(index,newField);
        changeEditStatus();
    }

    const handleOnChangeFieldRequired = () => {
        setIsRequired(!isRequired);
    }

    console.log(target,isRequired)

    if (!showUp) return null

    return <div style={{border:"1px solid black",padding:"20px",textAlign: "center",margin:"12px 25px",borderRadius:"12px"}}>
         <table style={{padding:"20px"}}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Value</th>
                <th>isRequired</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td><input placeholder="name" type="text" value={fieldName} onChange={handleOnChangeName}/></td>
            <td>
                <select value={currentType} onChange={handleOnChangeFieldTypes}>
                    {
                        FieldTypes.map(type => <option value={type} key={Math.random().toString(16).slice(2)}>{type}</option>)
                    }
                </select>
            </td>
            <td><input placeholder="value" type={currentType} value={fieldValue} onChange={handleOnChangeFieldValue} /></td>
            <td><input placeholder="is required" type="checkbox" value={isRequired}  onChange={handleOnChangeFieldRequired}/></td>
            <td style={{border:"0px"}}><button onClick={handleOnClickApply}>Apply</button></td>
            </tr>
       
        </tbody>
    </table>


    </div>
}