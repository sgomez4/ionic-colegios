//Lo ideal es que las interfaces se parezcan a los models que creamos
export interface Usuario{
    username: string;
    password: string;
    nombre: string;
    primerapellido: string;
    segundoapellido?: string; //? se pone para los que no son obligatorios
    correo: string;
    telcontacto: string;
}