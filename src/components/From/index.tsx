import { useEffect, useState } from "react"
import { IField } from "../../Interfaces/field.interface";
import { FieldConfiguration } from "./components/FieldConfiguration/index.tsx";
import { FieldEditor } from "./components/FieldEditor/index.tsx";
import { Field } from "../../classes/field.class.ts";

const dummyTarget = new Field()

export const Form = () => {
    const [fields, setFields]: [IField[], any] = useState([]);
    const [showUp, setShowUp] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editorTarget, setEditorTarget]:[IField,any] = useState(dummyTarget);

    // adds new field to the fields
    const addNewField = (field: IField) => {
        const newFields = [...fields, field];
        setFields(newFields);
    }

    const changeShowUp = () => {
        setShowUp(!showUp)
    }

    const changeEditStatus = (index:number) => {
        if (index !== undefined) {
            const target: IField = fields[index];
            setEditorTarget(target);
        }
        setEditing(!editing);
    }

    const swapFields = (index:number,newField:IField) => {
        const newFields = [...fields];
        newFields[index] = newField;
        setFields(newFields); 
    }


    const deleteFields = (index:number) => {
        const newFields = [...fields];
        newFields.splice(index,1);
        setFields(newFields);
    }



    return <div>


        <FieldConfiguration showUp={showUp} addNewField={addNewField} changeShowUp={changeShowUp} />
        <FieldEditor showUp={editing} changeEditStatus={changeEditStatus} swapFields={swapFields} target={editorTarget} index={fields.indexOf(editorTarget)} />

        {!showUp && !editing && <>
            <form>
                {
                    fields.map((field, index) => <Input 
                    key={Math.random().toString(16).slice(2)} 
                    {...field} 
                    index={index} 
                    changeEditStatus={changeEditStatus} 
                    deleteFields={deleteFields} />)
                }
            </form>
            <button onClick={changeShowUp}>Add New Field</button>
        </>}
    </div>
}


const Input = (props) => {
    const { name, type, value, required, index ,changeEditStatus,deleteFields} = props;

    const [val, setVal] = useState(value);

    const handleOnChangeValue = e => {
        setVal(e.target.value);
    }

    const handleOnClickRemove = () => {
        
        deleteFields(index);
    }

    const handleOnClickEdit = () => {

        changeEditStatus(index)
    }


    return <div>
        {name && <label>{required ? `${name}* : ` : `${name} : `}</label>}
        <input type={type} value={val} onChange={handleOnChangeValue} placeholder={value} />
        <button onClick={handleOnClickRemove}>remove</button>
        <button onClick={handleOnClickEdit}>edit</button>
    </div>
}