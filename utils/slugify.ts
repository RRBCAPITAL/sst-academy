export const slugify = (text: string): string => {
    return text
        .toString()
        .normalize('NFD') // Descompone caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (tildes)
        .toLowerCase()
        .replace(/\s+/g, '-') // Reemplaza los espacios con guiones
        .replace(/[^\w\-]+/g, '') // Elimina caracteres no válidos
        .replace(/\-\-+/g, '-') // Reemplaza múltiples guiones por uno
        .replace(/^-+/, '') // Elimina guiones al inicio
        .replace(/-+$/, ''); // Elimina guiones al final
};
