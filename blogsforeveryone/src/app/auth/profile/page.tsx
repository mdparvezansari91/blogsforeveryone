"use client"
import { profile } from '@/store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Profile() {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            await dispatch(profile());
            setLoading(false);
        };

        fetchProfile();
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>{user?.name}</p>
        </div>
    );
}