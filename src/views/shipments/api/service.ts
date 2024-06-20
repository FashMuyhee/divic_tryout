import {useQuery} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {Shipment, ShipmentStatus} from './types';

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
