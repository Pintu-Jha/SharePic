interface Auth{
  children:React.ReactNode
  signIn?:() => void
  signOut?:() => void
  createAccount?:() => void
  email?:string
  password?:string
  setEmail?:React.Dispatch<React.SetStateAction<string>>
  setPassword?:React.Dispatch<React.SetStateAction<string>>
}
interface User{
  children:React.ReactNode
  signIn?:()=> void
  signOut?:()=> void
  createAccount?:()=> void 
  email?:string
  password?:string
  name?:string
 
}

interface Children{
  children:React.ReactNode
}
interface Api {
  id: string
  url: string
};
interface Posts  {
  index?:any,
  id?: string,
  userId?:any,
  userName?: string,
  userImage?: string,
  postTime?: any,
  post?:string,
  postImage?:string | null,
  liked?:boolean,
  likes?:number,
  comments?:number,
  
}
