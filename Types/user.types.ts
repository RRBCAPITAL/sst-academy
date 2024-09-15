export interface DataUser {
    user_id: number;
    nombres: string;
    apellidos: string;
    dni: string;
    celular: string;
    correo: string;
    usuario: string;
    contrasenia: string;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    rol: string;
  }

 export interface User {
    user_id: number;
    nombres: string;
    apellidos: string;
    dni: string;
    celular: string;
    correo: string;
    usuario: string; 
    contrasenia: string;
    rol: string          
  }