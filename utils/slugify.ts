export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Reemplaza los espacios con guiones
        .replace(/[^\w\-]+/g, '') // Elimina caracteres no válidos
        .replace(/\-\-+/g, '-') // Reemplaza múltiples guiones por uno
        .replace(/^-+/, '') // Elimina guiones al inicio
        .replace(/-+$/, ''); // Elimina guiones al final
};
