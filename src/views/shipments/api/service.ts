import {useQuery} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {Shipment, ShipmentStatus} from './types';
import {shipmentHistory} from './mock-shipment';
import React from 'react';

export function useGetShipment() {
  return useQuery<AxiosResponse<Shipment[]>, AxiosError<any>, Shipment[]>({
    queryKey: ['shipments'],
    queryFn: () => {
      return axios.get('/frappe.client.get_list', {
        data: {
          doctype: 'AWB',
          fields: ['*'],
          filters: {
            name: ['like', '%add_search_term_here%'],
          },
        },
      });
    },
    select: data => data.data,
  });
}

export function useGetShipmentStatusList() {
  return useQuery<AxiosResponse<ShipmentStatus[]>, AxiosError<any>, ShipmentStatus[]>({
    queryKey: ['shipments'],
    queryFn: () => {
      return axios.get('/frappe.client.get_list', {
        data: {
          doctype: 'AWB Status',
          fields: ['*'],
        },
      });
    },
    select: data => data.data,
  });
}

export function useGetFakeShipments() {
  const [shipments, setShipments] = React.useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const randomizeArray = (array: Shipment[]) => {
    const shuffledArray = [...array];

    let currentIndex = shuffledArray.length,
      randomIndex = 0;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }

    return shuffledArray;
  };

  const onLoad = React.useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const shipments = randomizeArray(shipmentHistory);
      setShipments([...shipments]);
      setIsLoading(false);
    }, 3000);
  }, []);

  React.useEffect(() => {
    onLoad();
  }, []);

  return {isLoading, shipments, onRefetch: onLoad};
}
