const PATH = '//ec2-54-242-192-58.compute-1.amazonaws.com/'
import { get, post, put, del } from './fetch'
import { Item } from './app/(asider)/user/page'
import { DealerItem } from './app/(asider)/dealer/page'

export function login(data: { username: string; password: string }) {
  return post(`${PATH}auth/login`, data)
}

export function register(data: { username: 'string'; password: 'string'; email?: 'string'; mobile?: 'string'; status?: 0 }) {
  return post(`${PATH}auth/register`, data)
}

export function getUser(query: string): Promise<{ data: { users: Item[] } }> {
  return get(`${PATH}user?${query}`)
}
export function addUser(params: any) {
  return post(`${PATH}user`, params)
}
export function updateUser(params: Partial<Item>) {
  return put(`${PATH}user`, params)
}
export function delUser(id: string) {
  return del(`${PATH}user/${id}`)
}

export function getVehicle(query: string): Promise<{ data: { vehicles: Item[] } }> {
  return get(`${PATH}vehicle?${query}`)
}
export function getVehicleDetail(id: string) {
  return get(`${PATH}vehicle/${id}`)
}
export function updateVehicle(params: Item) {
  return put(`${PATH}vehicle`, params)
}
export function delVehicle(id: string) {
  return del(`${PATH}vehicle/${id}`)
}

export function getDealer(): Promise<{ data: { dealers: DealerItem[] } }> {
  return get(`${PATH}dealer`)
}
export function addDealer(params) {
  return post(`${PATH}dealer`, params)
}
export function filterDealer(id: string) {
  return get(`${PATH}dealer/${id}`)
}
export function updateDealer(params: Item) {
  return put(`${PATH}dealer`, params)
}
export function delDealer(id: string) {
  return del(`${PATH}dealer/${id}`)
}
