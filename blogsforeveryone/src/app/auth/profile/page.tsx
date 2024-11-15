"use client"
import { profile } from '@/store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React, { useEffect } from 'react'



function Profile() {
    const user = useAppSelector(state => state.auth.user)

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    return (
        <>
        <div>
            <h1>Profile</h1>
            <p>{user?.name}</p>
        </div>
        </>
    )
}

export default Profile