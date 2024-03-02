import { IOrder } from '@/app/type.web/order.type';
import { IHistoryStock } from '@/app/type.web/stock.type';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useGetHistoriesStock = (
  id: number,
  categoryId: number,
  startDate: string,
  endDate: string,
  search: string,
) => {
  const [data, setData] = useState<IHistoryStock[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch();
  }, [id, categoryId, startDate, endDate,search]);

  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        'http://localhost:8000/api/stocks/history-stock/' +
          id +
          `?${
            startDate && endDate
              ? `startDate=${startDate}&endDate=${endDate}&${
                  categoryId
                    ? `categoryId=${categoryId}`
                    : `${search ? `search=${search}` : ''}`
                }`
              : `${
                  categoryId
                    ? `categoryId=${categoryId}&${
                        search ? `search=${search}` : ''
                      }`
                    : `${search ? `search=${search}` : ''}`
                }`
          }`,
      );

      setData(data.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const refreshData = (startDate: string = '', endDate: string = '') => {
    fetch();
  };
  return { data, refreshData, loading };
};
