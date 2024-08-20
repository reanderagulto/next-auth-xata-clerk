'use client';
import React, { useRef } from 'react';
import style from './assets/FolderForm.module.css';

export default function FolderForm(
    {handleCreateForm}: 
    {handleCreateForm: (formData: FormData) => void}
) {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <form 
            className={style.formContainer}
            action={(formData) => {
                handleCreateForm(formData)
                ref.current?.reset();
            }}
            ref={ref}
        >
            <div className="grow">
                <label 
                    className={style.formLabel}
                    htmlFor="name"
                    aria-label="New Folder"
                >
                    New Name
                </label>
                <input 
                    className={style.formInput}
                    name="name"
                    id="name"
                    type="text" 
                    placeholder="My Folder"
                />
            </div>
            <button className={style.formButton}>
                Submit
            </button>
        </form>
    )
}
