export const deslugify = (slug: string): string => {
    return slug
        .replace(/-/g, ' ') // Reemplaza guiones con espacios
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza la primera letra de cada palabra
};
