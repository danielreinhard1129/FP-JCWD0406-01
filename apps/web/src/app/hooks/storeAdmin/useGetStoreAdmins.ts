
// import { IStoreAdmin } from '@/app/type.web/storeAdmin.type';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetStoreAdmins = () => {
    const [data, setData] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
      fetch();
    }, []);
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          ' http://localhost:8000/api/store-admins',
        );
        setData(data.data);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    const refreshData = () => {
      fetch();
    };
    return { data, refreshData, loading };
}

export default useGetStoreAdmins