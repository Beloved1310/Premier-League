export interface TeamInput {
  _id?: string
  code?: string
  name: string
  country: string
  founded: number
  toObject?(): Record<string, any>;
}