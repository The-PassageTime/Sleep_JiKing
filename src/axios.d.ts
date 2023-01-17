import axios from 'axios'

declare module 'axios' {
 interface IAxios<D = null> {
   code: string
   message: string
   extra: type
   struct: object
 }
 export interface AxiosResponse<T = any> extends IAxios<D> {}
}
