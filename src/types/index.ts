export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  featured: boolean
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  productId: string
  status: 'PENDING' | 'PAID' | 'COMPLETED' | 'CANCELLED'
  quantity: number
  total: number
  createdAt: Date
  updatedAt: Date
  user?: User
  product?: Product
}

export interface Setting {
  id: string
  key: string
  value: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

