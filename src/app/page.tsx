"use client"

import { addSampleUser, resetSampleUsers } from "@/actions/user.actions";
import User from "@/types/user";
import { useCallback, useEffect, useState, FormEvent } from "react";
import { useFormData } from "@/hooks"

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useFormData<User>({
    name: "",
    username: "",
    phone: "",
  })

  const addUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await addSampleUser(newUser)
    if (!res.ok) alert(res.message) 
    else {
      setUsers(res.data)
    }
  }

  const deleteUser = async (userId: number) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) alert(data.message);
    else getUser()
  }

  const resetUser = async () => {
    const res = await resetSampleUsers()
    if (!res.ok) alert(res.message)
    else getUser()
  }

  const getUser = useCallback(() => {
    fetch("/api/users")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setUsers(data.data);
    });
  }, [])

  useEffect(() => {
    // CSR Fetching
    getUser()
  }, [getUser])

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-3">API Route CSR Fetching</h1>
      <button type="button" className="bg-red-400 py-1.5 px-2 text-white shadow-lg hover:bg-red-500 text-sm rounded-md" onClick={resetUser}>RESET</button>
      <form className="flex flex-row gap-3 p-3" onSubmit={addUser}>
        <input type="text" className="border border-gray-300 rounded-md p-1.5" placeholder="Name" onChange={(e) => setNewUser("name", e.target.value)} required/>
        <input type="text" className="border border-gray-300 rounded-md p-1.5" placeholder="Username" onChange={(e) => setNewUser("username", e.target.value)} required/>
        <input type="text" className="border border-gray-300 rounded-md p-1.5" placeholder="Phone" onChange={(e) => setNewUser("phone", e.target.value)} required />
        <button type="submit" className="bg-green-400 py-1.5 px-2 text-white shadow-lg hover:bg-green-500 text-sm rounded-md">ADD</button>
      </form>
      <ul className="p-3">
        {users.map((user: User) => (
          <li key={user.id} className="p-3">
            <div className="flex flex-row">
              <div className="flex flex-col gap-1.5">
                <span className="text-lg font-bold">{user.name}</span>
                <span className="text-sm">{user.username}</span>
                <span className="text-sm">{user.phone}</span>
                <div className="flex">
                <button type="button" className="bg-blue-400 text-sm rounded-md py-1.5 px-2 text-white shadow-lg hover:bg-blue-500" onClick={() => deleteUser(user.id!)}>DELETE</button>
              </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
