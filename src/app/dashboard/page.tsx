import { getXataClient } from '@/xata';
import { 
  auth, 
  currentUser 
} from "@clerk/nextjs/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';
import { z } from 'zod';
import FolderForm from './FolderForm';

const schema = z.object({
  name: z.string().min(5)
});

const Dashboard = async () => {

  const { userId } = auth();
  const xataClient = getXataClient();
  const user = await currentUser()

  if(!userId) {
    redirect('/');
  }
  const folders = await xataClient.db.folders.filter({
    userId
  }).getMany();
  
  async function createFolder(formData: FormData) {
    'use server';
    const parsedForm = schema.parse({
        name: formData.get('name')
    })

    const newRecord = {...parsedForm, userId}
    
    if(!parsedForm.name) {
        return;
    }
    if(!userId) {
        return;
    }
    const xataClient = getXataClient();
    await xataClient.db.folders.create(newRecord);
    revalidatePath('/');
  }

  return (
    <div>
      <h1 className="mb-4">Dashboard Page</h1>
      <FolderForm handleCreateForm={createFolder}/>
      <div className="mb-10">
        {folders.map((folder) => {
          return (
            <p key={folder.id}>{folder.name}</p>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
