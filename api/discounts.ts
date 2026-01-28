import client from './client';

/**
 * GET all discounts for a client
 */
export const getDiscounts = (clientId: number) => {
  return client.get(`/discount-rules/${clientId}`);
};

/**
 * GET discount by ID (frontend filtering)
 */
export const getDiscountById = async (id: number, clientId = 1) => {
  const res = await getDiscounts(clientId);
  return res.data.data.find((d: any) => d.id === id);
};

/**
 * CREATE discount
 */
export const createDiscount = (payload: any) => {
  return client.post('/discount-rules', payload);
};

/**
 * UPDATE discount
 */
export const updateDiscount = (id: number, payload: any) => {
  return client.put(`/discount-rules/${id}`, payload);
};

/**
 * DELETE discount
 */
export const deleteDiscount = (id: number) => {
  return client.delete(`/discount-rules/${id}`);
};

/**
 * TOGGLE active / inactive
 */
export const toggleDiscount = (id: number, is_active: boolean) => {
  return client.put(`/discount-rules/${id}`, { is_active });
};
